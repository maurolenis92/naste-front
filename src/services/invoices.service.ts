import { inject, Injectable } from '@angular/core';
import { HttpClientService } from './http/http-client.service';
import { Observable } from 'rxjs';
import { Invoice } from '../app/shared/models/invoices.model';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private http = inject(HttpClientService);

  public getInvoices(): Observable<Partial<Invoice>[]> {
    return this.http.get('invoices');
  }

  public createInvoice(request: Partial<Invoice>): Observable<unknown> {
    return this.http.post('invoices', { body: request });
  }

  public getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get(`invoices/${id}`);
  }

  public updateInvoice(id: string, request: Partial<Invoice>): Observable<unknown> {
    return this.http.put(`invoices/${id}`, { body: request });
  }

  public updateInvoiceStatus(id: string, status: string): Observable<unknown> {
    return this.http.patch(`invoices/${id}/status`, { body: { status } });
  }

  public deleteInvoice(id: string): Observable<unknown> {
    return this.http.delete(`invoices/${id}`);
  }
}
