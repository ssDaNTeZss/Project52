import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-product-catalog-ui',
  templateUrl: './product-catalog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCatalogComponent {

  @Input() filteredProducts: Product[];

  public trackByFunction(index, item) {
    if (!item) return null;
    return item.id;
  };

  constructor() { }

}
