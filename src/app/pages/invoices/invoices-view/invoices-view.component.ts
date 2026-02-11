import { Component, inject, OnInit } from '@angular/core';
import { InvoicesService } from '../../../../services/invoices.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { Router } from '@angular/router';
import { TableComponent, TableData } from '../../../components/table/table.component';

@Component({
  selector: 'app-invoices-view',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TableComponent],
  templateUrl: './invoices-view.component.html',
  styleUrl: './invoices-view.component.scss',
})
export class InvoicesViewComponent implements OnInit {
  public tableData: TableData = {
    columns: [
      { header: '#ID', field: 'id' },
      { header: 'cliente', field: 'customerName' },
      { header: 'fecha', field: 'invoiceDate', type: 'date', class: 'table-cell-accent' },
      { header: 'total', field: 'total', type: 'currency' },
      {
        header: 'estado',
        field: 'status',
        class: 'badge badge-dot',
        classMap: {
          PAID: 'badge-paid',
          PENDING: 'badge-pending',
          DELIVERED: 'badge-delivered',
          CANCELLED: 'badge-cancelled',
        },
        valueMap: {
          PAID: 'Pagada',
          PENDING: 'Pendiente',
          DELIVERED: 'Entregada',
          CANCELLED: 'Cancelada',
        },
      },
      { header: 'Fecha entrega', field: 'deliveryDate', type: 'date' },
    ],
    data: [],
    totalPages: 0,
    currentPage: 1,
  };
  private invoicesService = inject(InvoicesService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadData(1);
  }

  public loadData(page: number): void {
    this.invoicesService.getInvoices({ page, size: 10 }).subscribe(invoices => {
      this.tableData.data = invoices.data;
      this.tableData.totalPages = invoices.pagination.totalPages;
      this.tableData.currentPage = invoices.pagination.currentPage;
    });
  }

  public navigateToCreateInvoice(): void {
    this.router.navigate(['dashboard/invoices/create']);
  }

  public navigateToInvoiceDetail(value: unknown): void {
    const id = (value as Record<string, unknown>)['id'] as string;
    this.router.navigate(['dashboard/invoices', id]);
  }
}
