import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from "../services/cookie.service";
import {ProductService} from "../services/product.service";
import {Observable, of, Subscription} from "rxjs";
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
  productsObs: Observable<Product[]>;
  products: Product[] = [];

  ngOnInit(): void {
    if (this.title === "RECENTLY-VIEWED") {
      this.subs = this.cookie.getCookie('phoneIds').subscribe((cookies: any) => {
        if (cookies) {
          this.ids = JSON.parse(cookies);

          this.ids.reverse().forEach(id => {
            if (id !== '') {
              this.subs = this.productService.getOneProduct(id).subscribe((data: any) => {
                this.products.push(data);
                this.changeDetection.markForCheck();
              });
            }
          });
        }
      });
      this.productsObs = of(this.products);
    }

    if (this.title === "MOST-POPULAR") {
      this.ids = [1001, 1002, 1003, 1004];

      this.ids.reverse().forEach(id => {
        if (id !== '') {
          this.subs = this.productService.getOneProduct(id).subscribe((data: any) => {
            this.products.push(data);
            this.changeDetection.markForCheck();
          });
        }
      });
      this.productsObs = of(this.products);
    }
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
