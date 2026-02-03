import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectInputComponent } from '../../components/select-input/select-input.component';
import { GenericModalData } from '../../shared/models/generic-moda.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectOption } from '../../shared/models/select.model';
import { STATUS_OPTIONS } from '../../shared/constants/options.constants';

@Component({
  selector: 'app-update-invoice-status',
  standalone: true,
  imports: [CommonModule, SelectInputComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './update-invoice-status.component.html',
  styleUrl: './update-invoice-status.component.scss',
})
export class UpdateInvoiceStatusComponent {
  public status: FormControl = new FormControl('');
  public statusOptions: SelectOption[] = STATUS_OPTIONS;
  private matDialog = inject(MatDialogRef<UpdateInvoiceStatusComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: GenericModalData) {
    this.data.additionalData = this.data.additionalData || {};
    this.status.setValue(this.data.additionalData.currentStatus || '');
  }

  public closeModal(): void {
    this.matDialog.close();
  }

  public confirmChange(): void {
    if (this.status.value.value) {
      this.matDialog.close({
        status: this.status.value.value,
      });
    }
  }
}
