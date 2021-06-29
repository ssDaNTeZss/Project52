import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule} from "../app-routing.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./header/header.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    TopbarComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
