import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {LoginFormComponent} from "./login-form/presentational/login-form.component";
import {LoginFormContainerComponent} from "./login-form/login-form.container.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginFormContainerComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginFormContainerComponent
  ]
})
export class LoginModule { }
