import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { ADValidators } from "../shared/custom-forms/custom-validators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group(
      {
        nickName: [
          "",
          Validators.compose([Validators.minLength(5), Validators.required])
        ],
        newPassword: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      }
      // {
      //   validator: ADValidators.match("newPassword", "confirmPassword")
      // }
    );
  }
}
