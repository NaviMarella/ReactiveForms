import {
  FormControl,
  ValidatorFn,
  FormGroup,
  FormArray,
  AbstractControl
} from "@angular/forms";

export class ADValidators {
  static match = (input: string, confirmInput: string) => {
    return (formGroup: FormGroup) => {
      if (formGroup.get(input).value !== formGroup.get(confirmInput).value) {
        return { noMatch: true };
      }
      return null;
    };
  };

  static getControlErrors(
    errors,
    label?: string,
    label2?: string,
    value?: any
  ): string[] {
    const errorMessages: string[] = [];
    if (errors) {
      const errorObj = errors;
      // TODO: localize, bootstrap bsDate: {minDate:"..."}
      Object.keys(errors).forEach(key => {
        let errorMessage = errorObj[key].error;
        switch (key) {
          case "required":
            errorMessages.push(`${label} is required.`);
            break;
          case "max":
            errorMessages.push(`${label} must be ${errors.max.max} or less.`);
            break;
          case "min":
            errorMessages.push(
              `${label} must be ${errors.min.min} or greater.`
            );
            break;
          case "validDate":
            errorMessages.push(`${label} must be a valid date.`);
            break;
          case "pastOrPresent":
            errorMessages.push(`${label} cannot be in the future.`);
            break;
          case "noMatch":
            errorMessages.push(`${label} must match ${label2}.`);
            break;
          case "dateLessThan":
            errorMessages.push(`${label} must be before ${label2}.`);
            break;
          case "minSelected":
            errorMessages.push(`At least ${value} ${label} must be selected.`);
            break;
          case "validAmount":
            errorMessages.push(`${label} must be a valid amount.`);
            break;
          case "zeroAmount":
            errorMessages.push(`${label} value must be greater than 0.`);
            break;
          case "pattern":
            if (label === "color") {
              errorMessages.push(`Must be in #HEX format.`);
            }
            if (label == "Amount") errorMessages.push(`${value}`);
            if (label == "Member Account Number")
              errorMessages.push(`Invalid account number`);
            break;
          case "nickNameLengthExceeded":
            errorMessages.push(`${label} must be 64 characters or less.`);
            break;
          case "noteLengthExceeded":
            errorMessages.push(`${label} must be 512 characters or less.`);
            break;
          case "invalidDayInMonth":
            errorMessages.push(
              `Invalid day in month. Value should be between 1 and 31.`
            );
            break;
          case "past":
            errorMessages.push(
              `${label} should be set to today or a future date.`
            );
            break;
          case "valueLessThanOrEqualToZero":
            errorMessage = errorMessage || "Value must be greater than 0.";
            errorMessages.push(errorMessage);
            break;
          case "sameValuesSelected":
            errorMessage = errorMessage || "Values are same.";
            errorMessages.push(errorMessage);
            break;
        }
      });
    }

    return errorMessages;
  }

  getErrorMessages(
    errors,
    label?: string,
    label2?: string,
    value?: any
  ): string[] {
    const errorMessages: string[] = [];
    if (errors) {
      const errorObj = errors;
      // TODO: localize, bootstrap bsDate: {minDate:"..."}
      Object.keys(errors).forEach(key => {
        let errorMessage = errorObj[key].error;
        switch (key) {
          case "required":
            errorMessages.push(`${label} is required.`);
            break;
          case "validDate":
            errorMessages.push(`${label} must be a valid date.`);
            break;
          case "pastOrPresent":
            errorMessages.push(`${label} cannot be in the future.`);
            break;
          case "noMatch":
            errorMessages.push(`${label} must match ${label2}.`);
            break;
          case "dateLessThan":
            errorMessages.push(`${label} must be before ${label2}.`);
            break;
          case "minSelected":
            errorMessages.push(`At least ${value} ${label} must be selected.`);
            break;
          case "validAmount":
            errorMessages.push(`${label} must be a valid amount.`);
            break;
          case "zeroAmount":
            errorMessages.push(`${label} value must be greater than 0.`);
            break;
          case "pattern":
            if (label === "color") {
              errorMessages.push(`Must be in #HEX format.`);
            }
            if (label == "Amount") errorMessages.push(`${value}`);
            if (label == "Member Account Number")
              errorMessages.push(`Invalid account number`);
            break;
          case "nickNameLengthExceeded":
            errorMessages.push(`${label} must be 64 characters or less.`);
            break;
          case "noteLengthExceeded":
            errorMessages.push(`${label} must be 512 characters or less.`);
            break;
          case "invalidDayInMonth":
            errorMessages.push(
              `Invalid day in month. Value should be between 1 and 31.`
            );
            break;
          case "past":
            errorMessages.push(
              `${label} should be set to today or a future date.`
            );
            break;
          case "valueLessThanOrEqualToZero":
            errorMessage = errorMessage || "Value must be greater than 0.";
            errorMessages.push(errorMessage);
            break;
          case "sameValuesSelected":
            errorMessage = errorMessage || "Values are same.";
            errorMessages.push(errorMessage);
            break;
        }
      });
    }

    return errorMessages;
  }
}
