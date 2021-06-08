import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.less']
})
export class ProductCarouselComponent implements OnInit {

  @Input() title?: string;
  constructor() { }

  ngOnInit(): void {
  }

}
