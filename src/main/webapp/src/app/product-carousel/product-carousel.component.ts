import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from "../services/cookie.service";
import {Observable, Subscription} from "rxjs";
import {ProductService} from "../services/product.service";
import {TranslateService} from "@ngx-translate/core";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-product-carousel-ui',
  templateUrl: './product-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent implements OnInit, OnDestroy {

  @Input() title?: string;
  @Input() products: Product[];

  private subs: Subscription;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private cookie: CookieService,
    private productService: ProductService,
    private translate: TranslateService
  ) {
  }

  translatedTitle = "";

  ngOnInit(): void {

    console.log(this.products);

    this.subs = this.translate.get("MAIN-PAGE.PRODUCT-CAROUSEL." + this.title).subscribe((res: string) => {
      this.translatedTitle = res;
      this.changeDetection.markForCheck();
    });

    // this.subs = this.cookie.getCookie('phoneIds').subscribe((cookies: any) => {
    //   console.log(cookies);
    //   if (cookies === '') {
    //     let arr = [];
    //     arr[0] = this.state.phoneDetails.id;
    //     // Cookie.setCookie('phoneIds', JSON.stringify(arr));
    //     this.cookie.setCookie('phoneIds', JSON.stringify(arr));
    //   } else {
    //     this.subs = this.cookie.getCookie('phoneIds').subscribe((arr: any) => {
    //       if (arr.length === 1) {
    //         if (arr[0] !== this.state.phoneDetails.id) {
    //           arr[1] = this.state.phoneDetails.id;
    //         }
    //       } else {
    //         if (arr[1] !== this.state.phoneDetails.id) {
    //           arr[0] = arr[1];
    //           arr[1] = this.state.phoneDetails.id;
    //         }
    //       }
    //       this.cookie.setCookie('phoneIds', JSON.stringify(arr));
    //     });
    //
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
