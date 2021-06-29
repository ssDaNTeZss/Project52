import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
