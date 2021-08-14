import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {CookieService} from "../../services/cookie.service";
import {Observable, Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";
import {TranslateService} from "@ngx-translate/core";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-product-carousel-ui',
  templateUrl: './product-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent implements OnInit, OnDestroy {

  @Input() title?: string;
  @Input() products: Product[];

  private subs: Subscription;

  scrWidth: number;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private cookie: CookieService,
    private productService: ProductService,
    private translate: TranslateService
  ) {
    this.getScreenSize();
  }

  translatedTitle = "";
  carouselMarginPer2: string;
  carouselMargin2 = 0;
  carouselLeftPer: string;
  carouselLeft = 0;
  test = 0;
  test2: string;
  perScreen: number;
  amountOfElements: number;
  _timer: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    if (this.scrWidth <= 1024) {
      this.perScreen = 50;
      this.amountOfElements = 2;
    } else {
      this.perScreen = 25;
      this.amountOfElements = 4;
    }
  }

  ngOnInit(): void {
    this.subs = this.translate.get("MAIN-PAGE.PRODUCT-CAROUSEL." + this.title).subscribe((res: string) => {
      this.translatedTitle = res;
      this.changeDetection.markForCheck();
    });

    this._timer = setInterval(() => {
      this.carouselMargin2 = this.carouselMargin2 + 5;

      if (this.carouselMargin2 > 15) {
        this.carouselMargin2 = 0;
      }
      this.carouselMarginPer2 = "-" + this.carouselMargin2 + "%";

      this.changeDetection.markForCheck();
    }, 6000)
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    if (this._timer){
      clearTimeout(this._timer);
    }
  }

  rightMover() {
    this.carouselLeft = this.carouselLeft + this.perScreen;

    if (this.carouselLeft / this.perScreen >
      this.products.length - this.amountOfElements) {
      this.carouselLeft = 0;
    }
    this.carouselLeftPer = "-" + this.carouselLeft + "%";
  }

  leftMover() {
    if (this.carouselLeft == 0) {
      this.carouselLeft = (this.products.length - this.amountOfElements) * this.perScreen;
    } else {
      this.carouselLeft = this.carouselLeft - this.perScreen;
    }
    this.carouselLeftPer = "-" + this.carouselLeft + "%";
  }
}
