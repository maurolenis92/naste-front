import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { Product } from '../../../shared/models/products.model';
import { Router } from '@angular/router';
import { TableComponent, TableData } from '../../../components/table/table.component';
import { InputComponent } from '../../../components/input/input.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-view',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TableComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.scss',
})
export class ProductsViewComponent implements OnInit {
  public tableData: TableData = {
    columns: [
      { header: 'Codigo', field: 'code' },
      { header: 'Descripcion', field: 'description' },
      { header: 'Precio', field: 'price', type: 'currency', class: 'table-cell-accent' },
      { header: 'stock', field: 'stock', type: 'number' },
      {
        header: 'Estado',
        field: 'isActive',
        type: 'text',
        class: 'badge badge-dot',
        classMap: { true: 'badge-paid', false: 'badge-cancelled' },
        valueMap: { true: 'Activo', false: 'Inactivo' },
      },
    ],
    data: [],
    totalPages: 0,
    currentPage: 1,
  };

  public searchTerm: FormControl = new FormControl('');

  public products!: Partial<Product>[];
  private productsService = inject(ProductsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadData(1);
  }

  public loadData(page: number): void {
    this._getProducts({ page, size: 10 });
  }

  public navigateToCreateProduct(): void {
    this.router.navigate(['dashboard/products/create']);
  }

  public navigateToProductDetail(value: unknown): void {
    const id = (value as Record<string, unknown>)['id'] as string;
    this.router.navigate(['dashboard/products', id]);
  }

  public refresh(): void {
    this.searchTerm.setValue('');
    this.loadData(this.tableData.currentPage);
  }

  public searchBycode(): void {
    const value = this.searchTerm.value;
    this._getProducts({ page: 1, size: 10, search: value });
  }

  private _getProducts<T>(params: T): void {
    this.productsService.getProducts(params).subscribe(products => {
      this.tableData.data = products.data;
      this.tableData.totalPages = products.pagination.totalPages;
      this.tableData.currentPage = products.pagination.currentPage;
    });
  }
}
