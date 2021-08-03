import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {Subscription} from "rxjs";
import {BasketService} from "../services/basket.service";
import {Basket} from "../models/basket.model";

@Component({
  selector: 'app-basket-ui',
  templateUrl: './basket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent implements OnInit, OnDestroy {

  @Input() basket?: Basket;

  @Output() clearButton = new EventEmitter<boolean>();

  private subs: Subscription;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private basketService: BasketService,
  ) { }

  // testBasket = {
  //   "id": 1,
  //   "totalPrice": 139999,
  //   "userId": 3,
  //   "items": [
  //     {
  //       "id": 2,
  //       "product": {
  //         "id": 1001,
  //         "name": "Samsung Galaxy S21",
  //         "rating": 4.40,
  //         "popularity": 3,
  //         "config": "128 GB Gray",
  //         "price": 60000,
  //         "img": "https://images.samsung.com/is/image/samsung/p6pim/ru/galaxy-s21/gallery/ru-galaxy-s21-5g-g991-sm-g991bzagser-368806301?$684_547_PNG$",
  //         "description": "The lineup comprises three devices, with the Galaxy S21 being the least expensive with a smaller screen size. In contrast to the Galaxy S20+, the S21+ is very similar to the S21 spec-wise, with the exception of a larger display, higher battery capacity.",
  //         "brand": "Samsung",
  //         "category": "phones",
  //         "images": [
  //           {
  //             "id": 10002,
  //             "imageLink": "https://images.samsung.com/is/image/samsung/p6pim/ru/galaxy-s21/gallery/ru-galaxy-s21-5g-g991-sm-g991bzadser-368806270?$684_547_PNG$"
  //           },
  //           {
  //             "id": 10001,
  //             "imageLink": "https://images.samsung.com/is/image/samsung/p6pim/ru/galaxy-s21/gallery/ru-galaxy-s21-5g-g991-sm-g991bzadser-368806266?$684_547_PNG$"
  //           }
  //         ],
  //         "techSpec": [
  //           {
  //             "id": 1001,
  //             "name": "Operating system",
  //             "value": "Android 11"
  //           },
  //           {
  //             "id": 1005,
  //             "name": "Internal memory",
  //             "value": "128 GB"
  //           },
  //           {
  //             "id": 1006,
  //             "name": "Weight",
  //             "value": "171 g"
  //           },
  //           {
  //             "id": 1004,
  //             "name": "Processor",
  //             "value": "Samsung Exynos 2100"
  //           },
  //           {
  //             "id": 1003,
  //             "name": "Display resolution",
  //             "value": "2400x1080"
  //           },
  //           {
  //             "id": 1002,
  //             "name": "Display",
  //             "value": "6.2, Super AMOLED 2X"
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       "id": 3,
  //       "product": {
  //         "id": 1002,
  //         "name": "Apple iPhone 12",
  //         "rating": 4.90,
  //         "popularity": 5,
  //         "config": "128 GB Blue",
  //         "price": 70000,
  //         "img": "https://1click.ru/upload/resized/500/500/75/upload/iblock/343/x343751fba0fee3c215c23a21edf95b83.png,q1605099576.pagespeed.ic.H7MHgemQwv.webp",
  //         "description": "5G speed. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera. iPhone 12 has it all — in two perfect sizes.",
  //         "brand": "Apple",
  //         "category": "phones",
  //         "images": [
  //           {
  //             "id": 10005,
  //             "imageLink": "http://www.pngall.com/wp-content/uploads/5/Apple-iPhone-12-PNG-Free-Download.png"
  //           },
  //           {
  //             "id": 10004,
  //             "imageLink": "https://app-room76.ru/wp-content/uploads/2020/10/iphone-12-blue-select-2020.png"
  //           }
  //         ],
  //         "techSpec": [
  //           {
  //             "id": 1008,
  //             "name": "Display",
  //             "value": "6.1, OLED"
  //           },
  //           {
  //             "id": 1009,
  //             "name": "Display resolution",
  //             "value": "2532x1170"
  //           },
  //           {
  //             "id": 10010,
  //             "name": "Processor",
  //             "value": "Apple A14 Bionic"
  //           },
  //           {
  //             "id": 1007,
  //             "name": "Operating system",
  //             "value": "iOS 14"
  //           },
  //           {
  //             "id": 10012,
  //             "name": "Weight",
  //             "value": "162 g"
  //           },
  //           {
  //             "id": 10011,
  //             "name": "Internal memory",
  //             "value": "128GB"
  //           }
  //         ]
  //       }
  //     }
  //   ]
  // };

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  closeBasket(): void {
    this.basketService.openBasket(false);
  }

  clearBasket(): void {
    this.clearButton.emit();
  }
}
