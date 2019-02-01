import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormModule } from "../shared/custom-forms/form.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
