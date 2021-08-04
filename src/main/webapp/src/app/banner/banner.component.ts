import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit, OnDestroy {

  carouselMarginPer: string;
  carouselMargin = 0;
  carouselMarginPer2: string;
  carouselMargin2 = 0;

  constructor(
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  _timer: number;
  _timer2: number;

  ngOnInit(): void {
    this._timer = setInterval(() => {
      this.carouselMargin = this.carouselMargin + 20;

      if (this.carouselMargin > 40) {
        this.carouselMargin = 0;
      }
      this.carouselMarginPer = "-" + this.carouselMargin + "%";

      this.changeDetection.markForCheck();
    }, 6000);

    this._timer2 = setInterval(() => {
      this.carouselMargin2 = this.carouselMargin2 + 5;

      if (this.carouselMargin2 > 15) {
        this.carouselMargin2 = 0;
      }
      this.carouselMarginPer2 = "-" + this.carouselMargin2 + "%";

      this.changeDetection.markForCheck();
    }, 6000);
  }

  ngOnDestroy(): void {
    if (this._timer){
      clearTimeout(this._timer);
    }
    if (this._timer2){
      clearTimeout(this._timer2);
    }
  }

  changeBanner(margin: number): void {
    this.carouselMargin = margin;
    this.carouselMarginPer = "-" + this.carouselMargin + "%";
    this.changeDetection.markForCheck();
  }

  toggleArrows(direction: string) {
    switch (direction) {
      case "forward":
        this.carouselMargin = this.carouselMargin + 20;

        if (this.carouselMargin > 40) {
          this.carouselMargin = 0;
        }
        break;
      case "back":
        this.carouselMargin = this.carouselMargin - 20;

        if (this.carouselMargin < 0) {
          this.carouselMargin = 40;
        }
        break;
    }
    this.carouselMarginPer = "-" + this.carouselMargin + "%";
    this.changeDetection.markForCheck();
  }

}
