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
  NgModel,
  NG_VALUE_ACCESSOR,
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

  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    super(validators, asyncValidators);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.serverErrors = this.serverErrors || new Array<string>();
  }

  ngOnInit() {
    if (this.readonly) {
      this.setDisabledState(this.readonly);
    }
  }

  onInputChange(event: any) {
    this.value = event.target.value;
  }

  onBlur() {
    this.touch();
  }
}

let identifier = 0;
