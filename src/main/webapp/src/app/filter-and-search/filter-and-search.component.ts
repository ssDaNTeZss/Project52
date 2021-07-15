import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {Brand} from "../models/brand.model";

@Component({
  selector: 'app-filter-and-search-ui',
  templateUrl: './filter-and-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterAndSearchComponent implements OnInit {

  @Input() state = {
    products: [],
    category: '',
    minValue: 0,
    maxValue: 0,
    current: 1,
    searchTerm: '',
    sortName: 'Sorting',
    minPrice: null,
    maxPrice: null,
    brands: [],
    appliedBrands: [],
    sortKey: '',
    sortCheckArrowUp: null,
  };
  @Output() sortChange = new EventEmitter<[string, boolean]>();

  @Output() brands = new EventEmitter<Brand[]>();

  private subs: Subscription;

  activatedSort = false;
  activatedBrand = false;
  activatedPrice = false;
  turnIcon: boolean;
  sortFilterTitle = "Sort";
  selectedValues = [];
  newBrands = [
    {value: "Apple", checked: false},
    {value: "Samsung", checked: false},
    {value: "Oppo", checked: false},
  ];
  test: boolean;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    // this.subs = this.route.params.subscribe((params: Params) => {
    //   this.state.category = params.typeProducts;
    //
    //   this.subs = this.productService.getProductsSameType(this.state.category).subscribe((data: any) => {
    //     this.state.products = data;
    //
    //     let prices = [];
    //     let brands = [];
    //
    //     for (let i = 0; i < data.length; i++) {
    //       prices.push(data[i].price);
    //       brands.push(data[i].brand);
    //     }
    //     this.state.minPrice = this.arrayMin(prices);
    //     this.state.maxPrice = this.arrayMax(prices);
    //
    //     this.state.brands = Array.from(new Set(brands));
    //
    //     console.log(this.state);
    //
    //     this.changeDetection.markForCheck();
    //   });
    // });

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
        this.sortChange.emit([filterTitle.slice(3), turnIcon]);
        break;
      case "brand":

        break;
      case "price":

        break;
    }
  }

  onToggle(): void {
    // if (e.target.checked) {
    //   this.state.appliedBrands.push(value);
    // } else {
    //   this.state.appliedBrands = this.state.appliedBrands.filter(x => x != value)
    // }
    // this.toggle.emit(this.state.appliedBrands);
    this.brands.emit(this.state.brands);
  }

  cleaningAppliedBrands(): void {
    this.state.appliedBrands = [];
    this.state.brands.map(brand => {
      brand.checked = false;
    });
    this.brands.emit(this.state.brands);
  }

  resetAllFilters() {

  }
}
