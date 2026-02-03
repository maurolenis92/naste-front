import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/products.model';
import { ProductsService } from '../../../../services/products.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  @Input() public id!: string;

  public product: Product | null = null;
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private location = inject(Location);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.loadProduct();
  }

  /**
   * Carga el producto desde el servicio
   */
  private loadProduct(): void {
    this.productsService.getProductById(this.id).subscribe({
      next: product => {
        this.product = product;
      },
      error: () => {
        this.router.navigate(['dashboard/products']);
      },
    });
  }

  /**
   * Getter para obtener la imagen del producto en formato base64
   * Si no hay imagen base64, retorna una imagen placeholder
   */
  public get productImageSrc(): string {
    if (this.product?.imageBase64) {
      // Si la imagen ya incluye el prefijo data:image, la retorna tal cual
      if (this.product.imageBase64.startsWith('data:image')) {
        return this.product.imageBase64;
      }
      // Si no, agrega el prefijo para JPEG por defecto
      return `data:image/jpeg;base64,${this.product.imageBase64}`;
    }
    // Imagen placeholder si no hay imagen
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3Ctext fill="%239aa1a9" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ESin imagen%3C/text%3E%3C/svg%3E';
  }

  /**
   * Navega hacia atrás en el historial
   */
  public goBack(): void {
    this.location.back();
  }

  /**
   * Navega a la página de edición del producto
   */
  public editProduct(): void {
    this.router.navigate(['dashboard/products', this.id, 'edit']);
  }

  public openDeleteConfirmationModal(): void {
    this.modalService.openGenericModal({
      title: 'Eliminar producto',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmAction: this.deleteProduct.bind(this),
    });
  }
  /**
   * Elimina el producto
   */
  private deleteProduct(): void {
    this.productsService.deleteProduct(this.id).subscribe({
      next: () => {
        this.router.navigate(['dashboard/products']);
      },
      error: error => {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto');
      },
    });
  }
}
