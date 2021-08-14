import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product.model";
import {BasketService} from "../../services/basket.service";
import {Brand} from "../../models/brand.model";

@Component({
  selector: 'app-product-ui',
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() changeQuantity = new EventEmitter<string>();
  @Input() numberOfItems: number;

  constructor(
    private basketService: BasketService,
  ) {
  }

  openFirstCard = false;
  openSecondCard = false;
  carouselLeftPer: string;
  carouselLeft = 0;
  perScreen = 100;

  ngOnInit(): void {
  }

  openInfoCard(cardName: string): void {
    if (cardName === "techSpec") {
      this.openFirstCard = !this.openFirstCard;
    }
    if (cardName === "description") {
      this.openSecondCard = !this.openSecondCard;
    }
  }

  rightMover(): void {
    this.carouselLeft = this.carouselLeft + this.perScreen;

    if (this.carouselLeft / this.perScreen >
      this.product.images.length) {
      this.carouselLeft = 0;
    }
    this.carouselLeftPer = "-" + this.carouselLeft + "%";
  }

  leftMover(): void {
    if (this.carouselLeft == 0) {
      this.carouselLeft = (this.product.images.length) * this.perScreen;
    } else {
      this.carouselLeft = this.carouselLeft - this.perScreen;
    }
    this.carouselLeftPer = "-" + this.carouselLeft + "%";
  }

  addToBasket(): void {
    this.basketService.sendToCart({id: this.product.id, name: this.product.name, numberOfItems: this.numberOfItems});
  }
}
