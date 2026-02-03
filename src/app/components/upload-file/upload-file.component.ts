import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true,
    },
  ],
})
export class UploadFileComponent implements ControlValueAccessor {
  @Input() label: string = 'Cargar archivo';
  @Input() accept: string = 'image/*';
  @Input() id: string = 'file-upload';
  @Input() placeholder: string = 'Seleccione un archivo';
  @Input() maxSizeMB: number = 5;

  fileName: string = '';
  fileBase64: string = '';
  disabled: boolean = false;
  errorMessage: string = '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.fileBase64 = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      // Validar formato JPEG
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
        this.errorMessage = 'Solo se permiten archivos en formato JPEG';
        this.fileName = '';
        this.fileBase64 = '';
        this.onChange('');
        input.value = '';
        return;
      }

      // Validar tamaño
      const maxSizeBytes = this.maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        this.errorMessage = `El archivo es muy grande. Tamaño máximo permitido: ${this.maxSizeMB}MB`;
        this.fileName = '';
        this.fileBase64 = '';
        this.onChange('');
        input.value = '';
        return;
      }

      this.errorMessage = '';
      this.fileName = file.name;
      this.convertToBase64(file);
    }
  }

  private convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Remover el prefijo "data:image/jpeg;base64," para enviar solo el base64 puro
      const base64String = dataUrl.split(',')[1];
      this.fileBase64 = base64String;
      this.onChange(base64String);
      this.onTouched();
    };
    reader.readAsDataURL(file);
  }

  clearFile(): void {
    this.fileName = '';
    this.fileBase64 = '';
    this.errorMessage = '';
    this.onChange('');
    this.onTouched();
  }
}
