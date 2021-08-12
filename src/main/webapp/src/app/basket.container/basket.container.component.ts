import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Observable, Subscription} from "rxjs";
import {BasketService} from "../services/basket.service";
import {count, mergeMap, switchMap} from "rxjs/operators";
import {Params} from "@angular/router";
import {Product} from "../models/product.model";
import {PopupService} from "../services/popup.service";


@Component({
  selector: 'app-basket',
  templateUrl: './basket.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketContainerComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  constructor(
    private basketService: BasketService,
    private changeDetection: ChangeDetectorRef,
    private popupService: PopupService,
  ) {
  }

  openBasket = false;
  basketObs: Observable<any>;

  ngOnInit(): void {
    this.subs = this.basketService.openBasket$.subscribe((openBasket: boolean) => {
      this.openBasket = openBasket;
      this.basketObs = this.basketService.getBasket();
      this.changeDetection.markForCheck();
    });

    this.basketService.sendToCart$
      .pipe(
        switchMap((idAndCount: { id: number, name: string, numberOfItems: number }) => {
            this.popupService.openPopup({openPopup: true, name: idAndCount.name, action: "add"});
            return this.basketService.addToBasket(idAndCount.id);

            // console.log(idAndCount.numberOfItems);
            // const array = new Array(idAndCount.numberOfItems).fill(5);
            // console.log(array);
            // // const array = [1,2,3,4,5];
            //
            // const arr = array.map(() => {
            //   return this.basketService.addToBasket(idAndCount.id);
            // });
            // console.log(arr);
            // const test = forkJoin(arr).subscribe();
            //
            // return arr;
          }
        ))
      .subscribe(() => {
      });

  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  clearBasket($event: boolean) {
    this.basketService.clearBasket().subscribe(() => {
      this.basketObs = this.basketService.getBasket();
      this.popupService.openPopup({openPopup: true, action: "clearBasket"});
      this.changeDetection.markForCheck();
    });
  }

  removeItem($event: { id: number, name: string }): void {
    this.basketService.removeItem($event.id).subscribe(() => {
      this.basketObs = this.basketService.getBasket();
      this.popupService.openPopup({openPopup: true, name: $event.name, action: "removeItem"});
      this.changeDetection.markForCheck();
    });
  }
}
