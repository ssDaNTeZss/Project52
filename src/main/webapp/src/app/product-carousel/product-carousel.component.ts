import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from "../services/cookie.service";
import {Subscription} from "rxjs";
import {ProductService} from "../services/product.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent implements OnInit, OnDestroy {

  @Input() title?: string;

  private subs: Subscription;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private cookie: CookieService,
    private productService: ProductService,
    private translate: TranslateService
  ) {
  }

  ids = [];
  state = {
    phoneDetails: null,
  };
  products = [];
  translatedTitle = "";

  ngOnInit(): void {

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

    this.subs = this.translate.get("MAIN-PAGE.PRODUCT-CAROUSEL." + this.title).subscribe((res: string) => {
      this.translatedTitle = res;
    });

    if (this.title === "RECENTLY-VIEWED") {
      this.subs = this.cookie.getCookie('phoneIds').subscribe((cookies: any) => {
        this.ids = JSON.parse(cookies);

        this.ids.reverse().forEach(id => {
          if (id !== '') {
            this.subs = this.productService.getOneProduct(id).subscribe((data: any) => {
              this.products.push(data);
              this.changeDetection.detectChanges();
            });
          }
        })
      });
    }

    if (this.title === "MOST-POPULAR") {
      this.ids = [1001, 1002, 1003, 1004];

      this.ids.reverse().forEach(id => {
        if (id !== '') {
          this.subs = this.productService.getOneProduct(id).subscribe((data: any) => {
            this.products.push(data);
            this.changeDetection.detectChanges();
          });
        }
      });

    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
