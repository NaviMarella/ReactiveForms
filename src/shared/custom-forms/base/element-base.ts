import { ValueAccessorBase } from "./value-accessor";
import { NgControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { Self, Optional } from "@angular/core";

import {
  AsyncValidatorArray,
  ValidatorArray,
  ValidationResult,
  message,
  validate
} from "../base";

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  protected abstract ngControl: NgControl;
  protected abstract serverErrors: Array<string>;

  constructor(
    protected validators: ValidatorArray,
    protected asyncValidators: AsyncValidatorArray
  ) {
    super();
  }

  public validate(): Observable<ValidationResult> {
    return validate(this.validators, this.asyncValidators)(
      this.ngControl.control
    );
  }

  public get invalid(): Observable<boolean> {
    if (this.serverErrors && this.serverErrors.length > 0)
      return Observable.of(true);
    if (this.pristine) return Observable.of(false);
    return this.validate().pipe(map(v => Object.keys(v || {}).length > 0));
  }

  protected get errors(): Observable<Array<string>> {
    let errors: Array<string> = [];

    this.validate().subscribe(validationResults => {
      if (validationResults) {
        Object.keys(validationResults).forEach(key => {
          if (key === "fieldValidator") {
            let fieldValidatorAsArray: Array<string>;

            if (validationResults.fieldValidator instanceof Boolean) {
              errors.push(message(validationResults, key));
            } else if (validationResults.fieldValidator instanceof Array) {
              fieldValidatorAsArray = <Array<string>>(
                validationResults.fieldValidator
              );
              fieldValidatorAsArray.forEach(element => {
                errors.push(element);
              });
            }
          } else {
            errors.push(message(validationResults, key));
          }
        });
      }
    });

    this.serverErrors.forEach(element => {
      errors.push(element);
    });

    return Observable.of(errors);
  }
}
