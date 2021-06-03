import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit {

  carouselMarginPer: string;
  carouselMargin = 0;

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.carouselMarginPer = "-" + this.carouselMargin + "%";
      this.carouselMargin = this.carouselMargin + 20;
      if (this.carouselMargin > 40) {
        this.carouselMargin = 0;
      }
    }, 2000)
  }

}
