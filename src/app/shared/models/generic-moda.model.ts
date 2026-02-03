/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface GenericModalData {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmAction?: () => void;
  cancelAction?: () => void;
  additionalData?: any;
}
