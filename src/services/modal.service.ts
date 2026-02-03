import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericModalComponent } from '../app/modals/generic-modal/generic-modal.component';
import { GenericModalData } from '../app/shared/models/generic-moda.model';
import { UpdateInvoiceStatusComponent } from '../app/modals/update-invoice-status/update-invoice-status.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dialog = inject(MatDialog);
  private config = {
    width: '500px',
    maxWidth: '80vw',
    disableClose: false,
    panelClass: 'custom-dialog-container',
    data: '',
  };

  public openGenericModal(data: GenericModalData): MatDialogRef<GenericModalComponent> {
    return this.dialog.open(GenericModalComponent, { ...this.config, data: data });
  }

  public openInvoiceStatusModal(
    data: GenericModalData
  ): MatDialogRef<UpdateInvoiceStatusComponent> {
    return this.dialog.open(UpdateInvoiceStatusComponent, { ...this.config, data: data });
  }
}
