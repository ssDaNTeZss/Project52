import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {Brand} from "../models/brand.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductCatalogService} from "../services/product-catalog.service";

@Component({
  selector: 'app-filter-and-search-ui',
  templateUrl: './filter-and-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterAndSearchComponent implements OnInit, OnDestroy {

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
    countFilteredProducts: null
  };
  @Output() sortChange = new EventEmitter<[string, boolean]>();

  @Output() brands = new EventEmitter<Brand[]>();
  @Output() selectedPrices = new EventEmitter<[number, number]>();

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
  formModelPrice: FormGroup;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private productService: ProductService,
    private route: ActivatedRoute,
    private ProductCatalogService: ProductCatalogService,
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

    this.subs = this.ProductCatalogService.filteredProducts$.subscribe((filteredProducts: any[]) => {
      this.state.countFilteredProducts = filteredProducts.length;
      console.log("FGG", filteredProducts.length)
      this.changeDetection.markForCheck();
    });

    this.formModelPrice = new FormGroup({
      minPrice: new FormControl(
        "",
        [
          Validators.min(this.state.minPrice),
          Validators.max(this.state.maxPrice),
        ],
      ),
      maxPrice: new FormControl(
        "",
        [
          Validators.min(this.state.minPrice),
          Validators.max(this.state.maxPrice),
        ],
      )
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
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

  onSubmitForm() {
    const FMP = this.formModelPrice.value;
    this.selectedPrices.emit([FMP.minPrice, FMP.maxPrice]);
  }

  get _minPrice() {
    return this.formModelPrice.get('minPrice')
  }

  get _maxPrice() {
    return this.formModelPrice.get('maxPrice')
  }

  clearPriceForm(): void {
    this.formModelPrice.reset();
    this.selectedPrices.emit([null, null]);
    this.activatedPrice = !this.activatedPrice;
  }
}
