import { Component, inject, Input, OnInit } from '@angular/core';
import { Invoice } from '../../../shared/models/invoices.model';
import { Router } from '@angular/router';
import { InvoicesService } from '../../../../services/invoices.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { ModalService } from '../../../../services/modal.service';
import { STATUS_OPTIONS } from '../../../shared/constants/options.constants';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss',
})
export class InvoiceDetailComponent implements OnInit {
  @Input() public id!: string;
  public invoice!: Invoice;
  private router = inject(Router);
  private invoicesService = inject(InvoicesService);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.loadInvoice();
  }

  private loadInvoice(): void {
    this.invoicesService.getInvoiceById(this.id).subscribe(invoice => {
      this.invoice = invoice;
    });
  }

  public editInvoice(): void {
    this.router.navigate([`dashboard/invoices/${this.id}/edit`]);
  }

  public downloadInvoice(): void {
    window.print();
  }

  private deleteInvoice(): void {
    this.invoicesService.deleteInvoice(this.id).subscribe({
      next: () => {
        this.router.navigate(['dashboard/invoices']);
      },
      error: error => {
        console.error('Error al eliminar la factura:', error);
        alert('Error al eliminar la factura');
      },
    });
  }

  public openUpdateStatusModal(): void {
    const dialogRef = this.modalService.openInvoiceStatusModal({
      title: 'Actualizar estado de la factura',
      message: 'Selecciona el nuevo estado para la factura.',
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar',
      confirmAction: () => {},
      additionalData: {
        currentStatus: STATUS_OPTIONS.find(
          option => option.value === this.invoice.status
        ),
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.updateStatus(result.status);
      }
    });
  }

  public openDeleteConfirmationModal(): void {
    this.modalService.openGenericModal({
      title: 'Eliminar factura',
      message: '¿Estás seguro de que deseas eliminar esta factura?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmAction: this.deleteInvoice.bind(this),
    });
  }

  private updateStatus(status: string): void {
    this.invoicesService.updateInvoiceStatus(this.id, status).subscribe({
      next: () => {
        this.loadInvoice();
      },
      error: error => {
        console.error('Error al actualizar el estado de la factura:', error);
        alert('Error al actualizar el estado de la factura');
      },
    });
  }
}
