import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { Product } from '../../../shared/models/products.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-view',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.scss',
})
export class ProductsViewComponent implements OnInit {
  public products: Partial<Product>[] = [];
  private productsService = inject(ProductsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  public navigateToCreateProduct(): void {
    this.router.navigate(['dashboard/products/create']);
  }

  public navigateToProductDetail(id: string): void {
    this.router.navigate(['dashboard/products', id]);
  }
}
