import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProductCatalogService} from "../services/product-catalog.service";
import {Subscription} from "rxjs";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCatalogContainerComponent implements OnInit, OnDestroy {

  private subs: Subscription;
  filteredProducts: Product[];
  public trackByFunction(index, item) {
    if (!item) return null;
    return item.id;
  };

  constructor(
    private changeDetection: ChangeDetectorRef,
    private ProductCatalogService: ProductCatalogService,
  ) {
  }

  ngOnInit(): void {
    this.subs = this.ProductCatalogService.filteredProducts$.subscribe((filteredProducts: Product[]) => {
      this.filteredProducts = filteredProducts;
      this.changeDetection.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
