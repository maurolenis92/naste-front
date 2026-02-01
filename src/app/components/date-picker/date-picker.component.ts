// TODO: PENDING REVIEW

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { ValidatorValue } from '../../shared/models/validator-value';
import { getErrorMessage } from '../../shared/utils/custom-validators';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export type DateValue = Date | DateRange | null;
@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
  @Input() public label: string = '';
  @Input() public placeholder: string = 'Selecciona una fecha';
  @Input() public id: string = '';
  @Input() public width: string = '100%';
  @Input() public mode: 'single' | 'range' = 'single';
  @Input() public valueValidator: ValidatorValue = {};
  @Input() public minDate: Date | null = null;
  public disabled: boolean = false;
  public value: DateValue = null;
  public form: FormGroup = new FormGroup({
    startDate: new FormControl(null),
    endDate: new FormControl(null),
  });

  private onChange = (value: any): void => {};
  public onTouched = (): void => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnInit(): void {
    if (this.mode === 'range') {
      this.form.valueChanges.subscribe(val => {
        this.value = { start: val.startDate, end: val.endDate };
        this.onChange(this.value);
        this.onTouched();
      });
    }
  }

  // Implementación de ControlValueAccessor
  public writeValue(value: any): void {
    this.value = value || null;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Método cuando el input cambia
  public onInputChange(event: any): void {
    const inputValue = event.value;
    this.value = inputValue;
    this.onChange(this.value);
    this.onTouched();
  }

  // Getter para acceder a los errores
  public get control(): any {
    return this.ngControl?.control;
  }

  public get errorMessage(): string {
    return getErrorMessage(this.control, this.valueValidator);
  }

  // Getter para saber si mostrar errores
  public get showErrors(): boolean {
    return !!(this.control && this.control.invalid && this.control.dirty);
  }
}
