import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {
  public filteredProducts$ = new Subject<Product[]>();

  public filteredProducts(filteredProducts: Product[]): void {
    this.filteredProducts$.next(filteredProducts);
  }
}
