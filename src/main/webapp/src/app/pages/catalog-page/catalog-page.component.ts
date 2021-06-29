import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogPageComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {

    this.subs = this.productService.getProducts().subscribe((data: any) => {
      this.changeDetection.detectChanges();
    });

    this.subs = this.productService.getProductsSameType("phone").subscribe((data: any) => {
      this.changeDetection.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
