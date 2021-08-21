import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogPageComponent {

  filteredProducts: Product[];

  constructor( ) { }

  category = "";

  typeProducts($event: string): void {
    this.category = $event;
  }
}
