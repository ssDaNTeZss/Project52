import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Observable, of, Subscription} from "rxjs";
import {BasketService} from "../services/basket.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

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

    this.subs = this.basketService.sendToCart$.subscribe((idAndCount: { id: number, count: number }) => {

      this.basketObs = this.basketService.addToBasket(1001);
      this.basketService.addToBasket(1003);

      this.basketService.addToBasket(idAndCount.id).subscribe(() => {
      })

      this.changeDetection.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
