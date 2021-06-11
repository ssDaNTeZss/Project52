import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  // styleUrls: ['./banner.component.less']
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
      this.carouselMarginPer = "-" + this.carouselMargin + "%";
      this.carouselMargin = this.carouselMargin + 20;
      if (this.carouselMargin > 40) {
        this.carouselMargin = 0;
      }
      this.changeDetection.detectChanges();
    }, 5000)
  }

}
