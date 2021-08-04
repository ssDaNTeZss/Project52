import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";
import {logger} from "codelyzer/util/logger";
import {ProductCatalogService} from "../services/product-catalog.service";
import {Brand} from "../models/brand.model";

@Component({
  selector: 'app-filter-and-search',
  templateUrl: './filter-and-search.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterAndSearchContainerComponent implements OnInit {

  @Output() typeProducts = new EventEmitter<string>();

  state = {
    products: [],
    category: '',
    minValue: 0,
    maxValue: 0,
    current: 1,
    searchTerm: '',
    sortName: 'default',
    minPrice: null,
    maxPrice: null,
    selectedMinPrice: null,
    selectedMaxPrice: null,
    brands: [],
    appliedBrands: [],
    sortKey: '',
    sortCheckArrowUp: false,
    filteredProducts: [],
    countFilteredProducts: null
  };

  constructor(
    private changeDetection: ChangeDetectorRef,
    private productService: ProductService,
    private ProductCatalogService: ProductCatalogService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => {
        this.state.category = params.typeProducts;

        switch (this.state.category){
          case "phones":
            this.typeProducts.emit("Phones");
            break;
          case "tablets":
            this.typeProducts.emit("Tablets");
            break;
          case "accessories":
            this.typeProducts.emit("Accessories");
            break;
        }


        return params.typeProducts;
      }),
      mergeMap(typeProducts => this.productService.getProductsSameType(typeProducts)))
      .subscribe((data: any) => {
        this.state.products = data;
        this.state.filteredProducts = data;
        this.ProductCatalogService.filteredProducts(this.state.filteredProducts);
        // this.state.countFilteredProducts = this.state.filteredProducts.length;

        let prices = [];
        let brands = [];

        for (let i = 0; i < data.length; i++) {
          prices.push(data[i].price);
          brands.push(data[i].brand);
        }

        this.state.minPrice = this.arrayMin(prices);
        this.state.maxPrice = this.arrayMax(prices);
        this.state.selectedMinPrice = this.state.minPrice;
        this.state.selectedMaxPrice = this.state.maxPrice;

        this.state.brands = Array.from(new Set(brands))
          .map(brand => new Brand(brand, false, false));

        this.changeDetection.markForCheck();
      });
  }

  sortChange(sortTitle?: [string, boolean]): void {
    if (sortTitle) {
      if (this.state.sortName !== sortTitle[0]) {
        this.state.sortName = sortTitle[0];
      }
      if (this.state.sortCheckArrowUp !== sortTitle[1]) {
        this.state.sortCheckArrowUp = sortTitle[1];
      }
    }
    this.selection();
  }

  onBrandsChange($event: Brand[]): void {
    let brands = [];
    $event.map(brand => {
      if (!brand.disabled && brand.checked) {
        brands.push(brand.value);
      }
    });
    this.state.appliedBrands = Array.from(new Set(brands));

    this.selection();
  }

  selection(): void {
    if (this.state.appliedBrands.length === 0) {
      this.state.filteredProducts = this.state.products;
    }

    this.filtration();
    this.sorting();

    this.ProductCatalogService.filteredProducts(this.state.filteredProducts);
  }

  filtration(): void {
    let prod = [];
    this.state.products.map(product => {
      if (product.price >= this.state.selectedMinPrice &&
        product.price <= this.state.selectedMaxPrice) {
        prod.push(product);
      }
    });

    if (this.state.appliedBrands.length !== 0) {
      this.state.filteredProducts = prod.filter(e => this.state.appliedBrands.includes(e.brand));
    } else {
      this.state.filteredProducts = prod;
    }
  }

  sorting(): void {
    if (this.state.sortName === 'default') {
      // this.filtration();
    } else {
      if (this.state.sortCheckArrowUp) {
        this.state.filteredProducts.sort(this.compare(this.state.sortName));
      } else {
        this.state.filteredProducts.sort(this.compare(this.state.sortName, -1));
      }
    }
  }

  compare(field?: any, order?: number): any {
    let len = arguments.length;
    if (len === 0) {
      return (a, b) => (a < b && -1) || (a > b && 1) || 0;
    }
    if (len === 1) {
      switch (typeof field) {
        case 'number':
          return field < 0 ?
            ((a, b) => (a < b && 1) || (a > b && -1) || 0) :
            ((a, b) => (a < b && -1) || (a > b && 1) || 0);
        case 'string':
          return (a, b) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0;
      }
    }
    if (len === 2 && typeof order === 'number') {
      return order < 0 ?
        ((a, b) => (a[field] < b[field] && 1) || (a[field] > b[field] && -1) || 0) :
        ((a, b) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0);
    }
  }

  arrayMin(arr: any): number {
    let len = arr.length, min = Infinity;
    while (len--) {
      if (arr[len] < min) {
        min = arr[len];
      }
    }
    return min;
  };

  arrayMax(arr: any): number {
    let len = arr.length, max = -Infinity;
    while (len--) {
      if (arr[len] > max) {
        max = arr[len];
      }
    }
    return max;
  };

  selectedPrices($event: [number, number]): void {
    if ($event[0] >= this.state.minPrice && $event[0] <= this.state.maxPrice) {
      this.state.selectedMinPrice = $event[0];
    }
    if ($event[1] <= this.state.maxPrice && $event[1] >= this.state.minPrice) {
      this.state.selectedMaxPrice = $event[1];
    }

    if ($event[0] === null && $event[1] === null) {
      this.state.selectedMinPrice = this.state.minPrice;
      this.state.selectedMaxPrice = this.state.maxPrice;
    }

    this.selection();
  }
}
