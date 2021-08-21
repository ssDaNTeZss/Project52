import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {BasketService} from "../../services/basket.service";
import {Basket} from "../../models/basket.model";

@Component({
  selector: 'app-basket-ui',
  templateUrl: './basket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent {

  @Input() basket?: Basket;

  @Output() clearButton = new EventEmitter<boolean>();
  @Output() removeItemButton = new EventEmitter<{id: number, name: string}>();

  constructor(
    private changeDetection: ChangeDetectorRef,
    private basketService: BasketService,
  ) { }

  closeBasket(): void {
    this.basketService.openBasket(false);
  }

  clearBasket(): void {
    this.clearButton.emit();
  }

  removeItem(id: number, name: string): void {
    this.removeItemButton.emit({id: id, name: name});
  }
}
