import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Optional,
  Inject,
  Self,
  ElementRef
} from "@angular/core";
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidatorFn,
  Validators,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
  NgControl
} from "@angular/forms";
import { ElementBase } from "../../base";

@Component({
  selector: "form-input",
  templateUrl: "./input.component.html"
})
export class FormInputComponent extends ElementBase<string> implements OnInit {
  @Input() public label: string;
  @Input() public type: string = "text";
  @Input() public help: string;
  @Input() protected serverErrors: Array<string>;
  @Input() public hidden: boolean = false;
  @Input() public requiredNoSpace?: string;
  @Input() public customMask?: string;
  @Input() public readonly: boolean = false;
  @Input() public placeHolder: string = "";

  public identifier = `form-text-${identifier++}`;
  public helpIdentifier = this.identifier + "-help";
  public labelClass;
  private timeLimit: number = 0;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
      console.log(this.ngControl);
    }
    this.serverErrors = this.serverErrors || new Array<string>();
  }

  ngOnInit() {
    if (this.readonly) {
      this.setDisabledState(this.readonly);
    }
    let control = this.ngControl.control;
    let validators: ValidatorFn = control.validator;
    let asyncValidators: ValidatorFn = control.asyncValidator;
    this.setValidators(validators, asyncValidators);
    //control.setValidators(validators);
    //control.updateValueAndValidity();
  }

  onInputChange(event: any) {
    this.value = event.target.value;
  }

  onBlur() {
    this.touch();
  }
}

let identifier = 0;
