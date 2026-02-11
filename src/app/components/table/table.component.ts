/* eslint-disable  @typescript-eslint/no-explicit-any */

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

export interface TableColumn {
  header: string;
  field: string;
  class?: string;
  type?: 'text' | 'number' | 'date' | 'currency';
  classMap?: Record<string, string>;
  valueMap?: Record<string, string>;
}

export interface TableData {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  totalPages: number;
  currentPage: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges, OnInit, OnDestroy {
  @Input() public tableData!: TableData;
  public currentPage: FormControl = new FormControl(1);
  @Output() public actionRowClick: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() public pageChange: EventEmitter<number> = new EventEmitter<number>();
  private $destroy: Subject<void> = new Subject<void>();

  public onActionRowClick(value: unknown): void {
    this.actionRowClick.emit(value);
  }

  public getValue(value: any): string {
    return value;
  }

  ngOnChanges(): void {
    this.currentPage.setValue(this.tableData.currentPage);
  }

  ngOnInit(): void {
    this.currentPage.valueChanges
      .pipe(takeUntil(this.$destroy), distinctUntilChanged(), debounceTime(900))
      .subscribe(value => {
        if (value < 1 || value > this.tableData.totalPages) {
          this.currentPage.setValue(this.tableData.currentPage, {
            emitEvent: false,
            onlySelf: true,
          });
          return;
        }
        this.pageChange.emit(value || 1);
      });
  }

  public changePage(next?: boolean): void {
    if (next && this.currentPage.value >= this.tableData.totalPages) {
      return;
    }
    if (!next && this.currentPage.value <= 1) {
      return;
    }
    this.currentPage.setValue(
      next ? this.currentPage.value + 1 : this.currentPage.value - 1,
      { emitEvent: false, onlySelf: true }
    );
    this.pageChange.emit(this.currentPage.value);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
