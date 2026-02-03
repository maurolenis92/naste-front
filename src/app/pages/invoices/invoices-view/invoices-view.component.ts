import { Component, inject, OnInit } from '@angular/core';
import { Invoice } from '../../../shared/models/invoices.model';
import { InvoicesService } from '../../../../services/invoices.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices-view',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './invoices-view.component.html',
  styleUrl: './invoices-view.component.scss',
})
export class InvoicesViewComponent implements OnInit {
  public invoices: Partial<Invoice>[] = [];
  private invoicesService = inject(InvoicesService);
  private router = inject(Router);

  ngOnInit(): void {
    this.invoicesService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  public navigateToCreateInvoice(): void {
    this.router.navigate(['dashboard/invoices/create']);
  }

  public navigateToInvoiceDetail(id: string): void {
    this.router.navigate(['dashboard/invoices', id]);
  }
}
