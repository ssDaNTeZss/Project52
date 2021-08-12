import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../models/product.model";


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogPageComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  filteredProducts: Product[];


  constructor(
    private changeDetection: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) { }

  category = "";

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  typeProducts($event: string): void {
    this.category = $event;
  }
}
