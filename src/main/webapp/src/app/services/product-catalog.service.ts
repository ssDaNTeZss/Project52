import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {
  public filteredProducts$ = new Subject<any[]>();

  public filteredProducts(filteredProducts: any[]): void {
    this.filteredProducts$.next(filteredProducts);
  }
}
