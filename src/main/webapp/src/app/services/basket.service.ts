import {Injectable} from '@angular/core';
import {WebRequestService} from "./web-request.service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public openBasket$ = new Subject<boolean>();
  public sendToCart$ = new Subject<{id: number, count: number}>();

  public openBasket(openBasket: boolean): void {
    this.openBasket$.next(openBasket);
  }

  public sendToCart(idAndCount: {id: number, count: number}): void {
    this.sendToCart$.next(idAndCount);
  }

  constructor(
    private webReqService: WebRequestService,
  ) {
  }

  getBasket(): Observable<Object> {
    return this.webReqService.get("basket");
  }

  addToBasket(id: number): Observable<Object> {
    return this.webReqService.post("basket", {id: id});
  }

  getUserInfo(): Observable<Object> {
    return this.webReqService.get("userinfo");
  }

  clearBasket(): Observable<Object> {
    return this.webReqService.delete("basket/clear");
  }

  removeItem(id: number): Observable<Object> {
    return this.webReqService.delete(`basket/removeitem/${id}`);
  }
}
