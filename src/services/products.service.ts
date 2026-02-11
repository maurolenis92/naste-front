import { inject, Injectable } from '@angular/core';
import { HttpClientService } from './http/http-client.service';
import { Observable } from 'rxjs';
import { Product } from '../app/shared/models/products.model';
import { PaginatedResponse } from '../app/shared/models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClientService);

  public getProducts<T>(params?: T): Observable<PaginatedResponse<Partial<Product>>> {
    return this.http.get('products', params ? { params } : undefined);
  }

  public createProduct(request: Partial<Product>): Observable<unknown> {
    return this.http.post('products', { body: request });
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get(`products/${id}`);
  }

  public updateProduct(id: string, request: Partial<Product>): Observable<unknown> {
    return this.http.put(`products/${id}`, { body: request });
  }

  public deleteProduct(id: string): Observable<unknown> {
    return this.http.delete(`products/${id}`);
  }
}
