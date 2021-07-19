import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { CatalogPageComponent } from "./pages/catalog-page/catalog-page.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {ProductPageComponent} from "./pages/product-page/product-page.component";


const routes: Routes = [
  {path: "", component: MainPageComponent},
  {path: "products/:typeProducts", component: CatalogPageComponent},
  {path: "productdetails/:idProduct", component: ProductPageComponent},
  {path: "**", component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
