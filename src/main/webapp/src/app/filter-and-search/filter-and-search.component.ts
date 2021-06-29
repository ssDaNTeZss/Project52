import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter-and-search',
  templateUrl: './filter-and-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterAndSearchComponent implements OnInit {

  activatedSort = false;
  activatedBrand = false;
  activatedPrice = false;
  turnIcon: boolean;
  sortFilterTitle = "Sort";

  constructor() {
  }

  ngOnInit(): void {
  }

  openFilter(nameFilter: string): void {
    switch (nameFilter) {
      case "sort":
        this.activatedSort = !this.activatedSort;
        this.activatedBrand = false;
        this.activatedPrice = false;
        break;
      case "brand":
        this.activatedBrand = !this.activatedBrand;
        this.activatedSort = false;
        this.activatedPrice = false;
        break;
      case "price":
        this.activatedPrice = !this.activatedPrice;
        this.activatedSort = false;
        this.activatedBrand = false;
        break;
    }
  }

  applyFilter(nameFilter: string, filterTitle: string, turnIcon?: boolean): void {
    this.turnIcon = turnIcon;

    switch (nameFilter) {
      case "sort":
        this.sortFilterTitle = filterTitle;
        if (filterTitle === "by default") {
          this.sortFilterTitle = "Sort";
        }
        break;
      case "brand":

        break;
      case "price":

        break;
    }
  }
}
