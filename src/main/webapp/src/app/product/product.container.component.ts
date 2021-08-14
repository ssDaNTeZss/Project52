import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {map, mergeMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {Subscription} from "rxjs";
import {CookieService} from "../services/cookie.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductContainerComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cookie: CookieService,
  ) { }

  productId: number;
  product: Product;
  numberOfItems = 1;

  ngOnInit(): void {


    this.route.params.pipe(
      map(params => {
        this.productId = params.idProduct;
        return params.idProduct;
      }),
      mergeMap(idProduct => this.productService.getOneProduct(idProduct)))
      .subscribe((data: Product) => {
        this.product = data;
        this.changeDetection.markForCheck();
      });

    this.subs = this.cookie.getCookie('phoneIds').subscribe((cookies: string) => {
      if (cookies === '') {
        let arr = [];
        arr[0] = this.productId;
        this.cookie.setCookie('phoneIds', JSON.stringify(arr));
      } else {
        let ids = JSON.parse(cookies);
          if (ids.length === 1) {
            if (ids[0] !== this.productId) {
              ids[1] = this.productId;
            }
          } else {
            if (ids[1] !== this.productId) {
              ids[0] = ids[1];
              ids[1] = this.productId;
            }
          }
          this.cookie.setCookie('phoneIds', JSON.stringify(ids));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  changeQuantity($event: string) {
      if ($event === "increase") {
        if (this.numberOfItems < 199) {
          this.numberOfItems++;
        }
      }
      if ($event === "decrease") {
        if (this.numberOfItems > 1) {
          this.numberOfItems--;
        }
      }
  }
}
