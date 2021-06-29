import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { CatalogPageComponent } from "./pages/catalog-page/catalog-page.component";


const routes: Routes = [
  {path: "", component: MainPageComponent},
  {path: "products/:typeProducts", component: CatalogPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
