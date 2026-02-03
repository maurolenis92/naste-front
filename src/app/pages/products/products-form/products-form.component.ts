import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../components/input/input.component';
import { UploadFileComponent } from '../../../components/upload-file/upload-file.component';
import { OnlyNumbersValidator } from '../../../shared/utils/custom-validators';
import { ButtonComponent } from '../../../components/button/button.component';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    UploadFileComponent,
    ButtonComponent,
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  @Input() public id?: string;
  public form: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    stock: new FormControl('', [Validators.required, OnlyNumbersValidator()]),
    imageBase64: new FormControl(''),
    isActive: new FormControl(true, [Validators.required]),
  });
  public buttonLoading: boolean = false;
  public buttonDisabled: boolean = true;
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private productsService = inject(ProductsService);

  ngOnInit(): void {
    if (this.id) {
      this.loadProduct();
    }
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe(() => {
        this.buttonDisabled = !this.form.valid;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public action(): void {
    if (this.id) {
      this.update();
    } else {
      this.save();
    }
  }

  private save(): void {
    if (!this.form.valid) return;

    this.buttonLoading = true;
    const request = { ...this.form.value, stock: Number(this.form.value.stock) };
    this.productsService.createProduct(request).subscribe({
      next: () => {
        this.buttonLoading = false;
        this.router.navigate(['dashboard/products']);
      },
      error: () => {
        this.buttonLoading = false;
      },
    });
  }

  private update(): void {
    if (!this.form.valid || !this.id) return;

    this.buttonLoading = true;
    const request = { ...this.form.value, stock: Number(this.form.value.stock) };
    this.productsService.updateProduct(this.id, request).subscribe({
      next: () => {
        this.buttonLoading = false;
        this.router.navigate(['dashboard/products']);
      },
      error: () => {
        this.buttonLoading = false;
      },
    });
  }

  public cancel(): void {
    this.router.navigate(['dashboard/products']);
  }

  private loadProduct(): void {
    this.productsService.getProductById(this.id!).subscribe({
      next: product => {
        this.form.patchValue({
          code: product.code,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imageBase64: product.imageBase64,
          isActive: product.isActive,
        });
      },
    });
  }
}
