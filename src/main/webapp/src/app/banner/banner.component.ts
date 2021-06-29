import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {

  carouselMarginPer: string;
  carouselMargin = 0;

  constructor(
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.carouselMargin = this.carouselMargin + 20;

      if (this.carouselMargin > 40) {
        this.carouselMargin = 0;
      }
      this.carouselMarginPer = "-" + this.carouselMargin + "%";

      this.changeDetection.markForCheck();
    }, 6000)
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
