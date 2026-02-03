/* eslint-disable  @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { SelectInputComponent } from '../../../components/select-input/select-input.component';
import { DatePickerComponent } from '../../../components/date-picker/date-picker.component';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { InvoicesService } from '../../../../services/invoices.service';
import { SelectOption } from '../../../shared/models/select.model';
import {
  ORIGIN_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  STATUS_OPTIONS,
} from '../../../shared/constants/options.constants';
import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../shared/models/products.model';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    SelectInputComponent,
    DatePickerComponent,
  ],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.scss',
})
export class InvoiceFormComponent implements OnInit, OnDestroy {
  @Input() public id?: string;
  public form: FormGroup = new FormGroup({
    status: new FormControl(''),
    origin: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [Validators.required]),
    customerIdDoc: new FormControl('', [Validators.required]),
    customerPhone: new FormControl('', [Validators.required]),
    customerEmail: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    deliveryDate: new FormControl('', [Validators.required]),
    items: new FormArray([]),
  });
  private $destroy = new Subject<void>();
  private router = inject(Router);
  private invoiceService = inject(InvoicesService);
  private productsService = inject(ProductsService);
  private alertService = inject(AlertService);
  public buttonLoading: boolean = false;
  public buttonDisabled: boolean = true;
  public statusOptions: SelectOption[] = STATUS_OPTIONS;
  public originOptions: SelectOption[] = ORIGIN_OPTIONS;
  public paymentMethodOptions: SelectOption[] = PAYMENT_METHOD_OPTIONS;
  public productOptions: SelectOption[] = [];
  public products: Product[] = [];

  ngOnInit(): void {
    this.loadProductOptions();
    this.form.valueChanges
      .pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(() => {
        this.validateButtonStatus();
      });
  }

  private loadProductOptions(): void {
    this.productsService.getProducts().subscribe(options => {
      this.products = options as Product[];
      this.productOptions = options.map(product => ({
        label: product.description!,
        value: product.id!,
      }));
      this.productOptions.unshift({ label: 'Manual', value: 'MANUAL' });
      if (this.id) {
        this.loadData();
      } else {
        this.addItem();
      }
    });
  }

  private validateButtonStatus(): void {
    this.buttonDisabled =
      this.form.invalid || (this.form.get('items') as FormArray).length === 0;
  }

  public addItem(): void {
    const itemsFormArray = this.form.get('items') as FormArray;
    const tempForm = new FormGroup({
      productId: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      unitPrice: new FormControl('', [Validators.required]),
    });
    this.initProductSubscription(tempForm);
    itemsFormArray.push(tempForm);
  }

  private initProductSubscription(formTemp: FormGroup): void {
    formTemp
      .get('productId')!
      .valueChanges.pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(productId => {
        if (productId.value !== 'MANUAL') {
          const selectedProduct = this.products.find(
            product => product.id === productId.value
          );
          if (selectedProduct) {
            formTemp.patchValue({
              description: selectedProduct.description,
              unitPrice: selectedProduct.price,
            });
          }
        } else {
          formTemp.patchValue({
            description: '',
            unitPrice: 0,
          });
        }
      });
  }

  public removeItem(index: number): void {
    const itemsFormArray = this.form.get('items') as FormArray;
    itemsFormArray.removeAt(index);
  }

  public getTotalItem(index: number): number {
    const group = this.getGroup(index);
    const quantity = group.get('quantity')!.value;
    const unitPrice = group.get('unitPrice')!.value;
    return quantity * unitPrice;
  }

  private update(): void {
    this.buttonLoading = true;
    const request = {
      ...this.form.value,
      origin: this.form.value.origin.value,
      paymentMethod: this.form.value.paymentMethod.value,
      items: this.form.value.items.map((item: any) => ({
        ...item,
        quantity: Number(item.quantity),
        ...(item.productId.value === 'MANUAL'
          ? { productId: null }
          : { productId: item.productId.value }),
      })),
    };
    this.invoiceService.updateInvoice(this.id!, request).subscribe({
      next: () => {
        this.buttonLoading = false;
        this.alertService.showSuccess('Factura actualizada exitosamente');
        this.router.navigate(['dashboard/invoices']);
      },
      error: err => {
        if (err.error.error.includes('Insufficient stock')) {
          this.alertService.showError(
            'Error al actualizar la factura: Stock insuficiente'
          );
        } else {
          this.alertService.showError('Error al actualizar la factura');
        }
        this.buttonLoading = false;
      },
    });
  }

  private save(): void {
    this.buttonLoading = true;
    const request = {
      ...this.form.value,
      status: 'PENDING',
      origin: this.form.value.origin.value,
      paymentMethod: this.form.value.paymentMethod.value,
      items: this.form.value.items.map((item: any) => ({
        ...item,
        quantity: Number(item.quantity),
        ...(item.productId.value === 'MANUAL'
          ? { productId: null }
          : { productId: item.productId.value }),
      })),
    };
    this.invoiceService.createInvoice(request).subscribe({
      next: () => {
        this.buttonLoading = false;
        this.alertService.showSuccess('Factura creada exitosamente');
        this.router.navigate(['dashboard/invoices']);
      },
      error: () => {
        this.alertService.showError('Error al crear la factura');
        this.buttonLoading = false;
      },
    });
  }

  public action(): void {
    if (this.buttonDisabled || this.buttonLoading) return;
    if (this.id) {
      this.update();
    } else {
      this.save();
    }
  }

  public cancel(): void {
    this.router.navigate(['dashboard/invoices']);
  }

  private loadData(): void {
    this.invoiceService.getInvoiceById(this.id!).subscribe(invoice => {
      this.form.patchValue({
        status: invoice.status,
        origin: this.originOptions.find(option => option.value === invoice.origin),
        paymentMethod: this.paymentMethodOptions.find(
          option => option.value === invoice.paymentMethod
        ),
        customerName: invoice.customerName,
        customerIdDoc: invoice.customerIdDoc,
        customerPhone: invoice.customerPhone,
        customerEmail: invoice.customerEmail,
        city: invoice.city,
        neighborhood: invoice.neighborhood,
        address: invoice.address,
        total: invoice.total,
        invoiceDate: invoice.invoiceDate,
        deliveryDate: invoice.deliveryDate,
      });
      const itemsFormArray = this.form.get('items') as FormArray;
      itemsFormArray.clear();
      invoice.items.forEach(item => {
        const formTemp = new FormGroup({
          productId: new FormControl(item.productId, [Validators.required]),
          description: new FormControl(item.description, [Validators.required]),
          quantity: new FormControl(item.quantity, [Validators.required]),
          unitPrice: new FormControl(item.unitPrice, [Validators.required]),
        });
        const productSelected = item.productId
          ? this.productOptions.find(option => option.value === item.productId)
          : (this.productOptions[0] as any);
        formTemp.patchValue({
          productId: productSelected,
        });
        this.initProductSubscription(formTemp);
        itemsFormArray.push(formTemp);
      });
    });
  }

  public getControls(): AbstractControl[] {
    return (this.form.get('items') as FormArray).controls;
  }

  public getGroup(index: number): FormGroup {
    return (this.form.get('items') as FormArray).at(index) as FormGroup;
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
