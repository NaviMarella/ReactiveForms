import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormInputComponent } from "../custom-forms/fields/input/input.component";

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: [],
  entryComponents: [],
  declarations: [FormInputComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [ReactiveFormsModule, FormsModule, CommonModule, FormInputComponent]
})
export class FormModule {}
