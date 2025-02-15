import { NgClass, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  input,
  InputSignal,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmployeeSelectorOption } from '../../@shared/api/employee-selector';

@Component({
  selector: 'app-employee-selector',
  imports: [NgClass, NgOptimizedImage],
  templateUrl: './employee-selector.component.html',
  styleUrl: './employee-selector.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EmployeeSelectorComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSelectorComponent implements OnInit, OnChanges, ControlValueAccessor {
  value: EmployeeSelectorOption | undefined = undefined;
  options: InputSignal<EmployeeSelectorOption[]> = input.required();
  disabled: InputSignal<boolean> = input(false);

  @Output() change = new EventEmitter();
  private readonly cdr = inject(ChangeDetectorRef);

  onChange: (newValue: EmployeeSelectorOption) => void = () => {};

  onTouch: () => void = () => {};

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.onChange(changes['value'].currentValue);
    }
  }

  writeValue(obj: EmployeeSelectorOption): void {
    this.value = obj;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  setValue(value: EmployeeSelectorOption): void {
    if (!this.disabled()) {
      this.value = value;
      this.onChange(value);
      this.onTouch();
      this.change.emit(this.value);
    }
  }
}
