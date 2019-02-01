import { Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

export class ValueAccessorBase<T> implements ControlValueAccessor {
  private initialValueSet: boolean;
  private initialValue: T;
  private innerValue: T;
  private touched = new Array<() => void>();

  changed = new Array<(value: T) => void>();

  get pristine(): boolean {
    if (!this.initialValueSet) return true;
    return this.initialValue === this.innerValue;
  }

  get dirty(): boolean {
    return !this.pristine;
  }

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    this.storeInitialValue();
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }

  storeInitialValue() {
    if (this.initialValueSet) return;
    this.initialValueSet = true;
    this.initialValue = this.innerValue;
  }

  touch() {
    this.touched.forEach(f => f());
  }

  writeValue(value: T) {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }

  setDisabledState(disabled: boolean) {}
}
