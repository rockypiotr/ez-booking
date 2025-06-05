import { NgClass } from '@angular/common';
import {
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
import { Chip } from 'primeng/chip';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-time-picker',
  imports: [Chip, NgClass, Ripple],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TimePickerComponent,
      multi: true,
    },
  ],
})
export class TimePickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  value: unknown = undefined;
  options: InputSignal<any[]> = input.required();
  disabled: InputSignal<boolean> = input(false);

  @Output() change = new EventEmitter();
  private readonly cdr = inject(ChangeDetectorRef);

  onChange: (newValue: any) => void = () => {};

  onTouch: () => void = () => {};

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.onChange(changes['value'].currentValue);
    }
  }

  writeValue(obj: any): void {
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

  setValue(value: any): void {
    if (!this.disabled()) {
      this.value = value;
      this.onChange(value);
      this.onTouch();
      this.change.emit(this.value);
    }
  }
}
