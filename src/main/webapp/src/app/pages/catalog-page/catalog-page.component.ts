import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogPageComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  filteredProducts: any[];

  constructor(
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
