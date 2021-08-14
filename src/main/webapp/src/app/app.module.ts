import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { BasketComponent } from './basket/presentational/basket.component';
import { BasketContainerComponent } from './basket/basket.container.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { DeclensionWordPipe } from './pipes/declension-word.pipe';
import { FilterAndSearchComponent } from './filter-and-search/presentational/filter-and-search.component';
import { FilterAndSearchContainerComponent } from './filter-and-search/filter-and-search.container.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderModule } from "./header-module/header.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { LoginFormComponent } from './login-form/presentational/login-form.component';
import { LoginFormContainerComponent } from './login-form/login-form.container.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PopupComponent } from './popup/presentational/popup.component';
import { PopupContainerComponent } from './popup/popup.container.component';
import { PriceFormattingPipe } from './pipes/price-formatting.pipe';
import { ProductCarouselComponent } from './product-carousel/presentational/product-carousel.component';
import { ProductCarouselContainerComponent } from './product-carousel/product-carousel.container.component';
import { ProductCatalogComponent } from './product-catalog/presentational/product-catalog.component';
import { ProductCatalogContainerComponent } from './product-catalog/product-catalog.container.component';
import { ProductComponent } from './product/presentational/product.component';
import { ProductContainerComponent } from './product/product.container.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { SignupFormComponent } from './signup-form/presentational/signup-form.component';
import { SignupFormContainerComponent } from './signup-form/signup-form.container.component';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    BasketComponent,
    BasketContainerComponent,
    CatalogPageComponent,
    DeclensionWordPipe,
    FilterAndSearchComponent,
    FilterAndSearchContainerComponent,
    FooterComponent,
    LoginFormComponent,
    LoginFormContainerComponent,
    MainPageComponent,
    PageNotFoundComponent,
    PopupComponent,
    PopupContainerComponent,
    PriceFormattingPipe,
    ProductCarouselComponent,
    ProductCarouselContainerComponent,
    ProductCatalogComponent,
    ProductCatalogContainerComponent,
    ProductComponent,
    ProductContainerComponent,
    ProductPageComponent,
    SignupFormComponent,
    SignupFormContainerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        }),
        HeaderModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
