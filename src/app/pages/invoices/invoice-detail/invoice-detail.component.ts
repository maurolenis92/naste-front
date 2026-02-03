import { Component, inject, Input, OnInit } from '@angular/core';
import { Invoice } from '../../../shared/models/invoices.model';
import { Router } from '@angular/router';
import { InvoicesService } from '../../../../services/invoices.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { ModalService } from '../../../../services/modal.service';
import {
  ORIGIN_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  STATUS_OPTIONS,
} from '../../../shared/constants/options.constants';
import { AlertService } from '../../../../services/alert.service';

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
  private alertService = inject(AlertService);
  public status: string = '';
  public origin: string = '';
  public paymentMethod: string = '';

  ngOnInit(): void {
    this.loadInvoice();
  }

  private loadInvoice(): void {
    this.invoicesService.getInvoiceById(this.id).subscribe(invoice => {
      this.invoice = invoice;
      this.status = this.getStatus();
      this.origin = this.getOrigin();
      this.paymentMethod = this.getPaymentMethod();
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
        this.alertService.showSuccess('Factura eliminada exitosamente');
        this.router.navigate(['dashboard/invoices']);
      },
      error: error => {
        this.alertService.showError('Error al eliminar la factura');
        console.error('Error al eliminar la factura:', error);
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
        this.alertService.showSuccess('Estado de la factura actualizado exitosamente');
        this.loadInvoice();
      },
      error: error => {
        this.alertService.showError('Error al actualizar el estado de la factura');
        console.error('Error al actualizar el estado de la factura:', error);
      },
    });
  }

  private getStatus(): string {
    return (
      STATUS_OPTIONS.find(option => option.value === this.invoice.status)?.label || ''
    );
  }

  private getOrigin(): string {
    return (
      ORIGIN_OPTIONS.find(option => option.value === this.invoice.origin)?.label || ''
    );
  }

  private getPaymentMethod(): string {
    return (
      PAYMENT_METHOD_OPTIONS.find(option => option.value === this.invoice.paymentMethod)
        ?.label || ''
    );
  }
}
