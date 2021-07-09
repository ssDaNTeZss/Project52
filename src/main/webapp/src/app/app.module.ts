import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BannerComponent } from './banner/banner.component';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { FilterAndSearchComponent } from './filter-and-search/filter-and-search.component';
import { HeaderModule } from "./header-module/header.module";
import { ProductCarouselContainerComponent } from './product-carousel.container/product-carousel.container.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BannerComponent,
    ProductCarouselComponent,
    FooterComponent,
    CatalogPageComponent,
    FilterAndSearchComponent,
    ProductCarouselContainerComponent,
    PageNotFoundComponent
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
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
