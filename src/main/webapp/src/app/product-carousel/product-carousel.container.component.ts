import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from "../services/cookie.service";
import {ProductService} from "../services/product.service";
import {forkJoin, Observable, Subscription} from "rxjs";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselContainerComponent implements OnInit, OnDestroy {

  @Input() title: string;

  private subs: Subscription;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private cookie: CookieService,
    private productService: ProductService,
  ) {
  }

  ids = [];
  state = {
    phoneDetails: null,
  };
  productsObs: Observable<Object[]>;
  products: Product[] = [];

  ngOnInit(): void {
    if (this.title === "RECENTLY-VIEWED") {
      this.subs = this.cookie.getCookie('phoneIds').subscribe((cookies: string) => {
        if (cookies) {
          this.ids = JSON.parse(cookies);

          const arr = this.ids.reverse().map(id => {
            return this.productService.getOneProduct(id);
          });

          this.productsObs = forkJoin(arr);
        }
      });
    }

    if (this.title === "MOST-POPULAR") {
      this.ids = [1005, 1002, 1003, 1004, 1001];

      const arr = this.ids.reverse().map(id => {
        return this.productService.getOneProduct(id);
      });

      this.productsObs = forkJoin(arr);
    }
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
