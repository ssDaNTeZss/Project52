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
    brands: [],
    appliedBrands: [],
    sortKey: '',
    sortCheckArrowUp: false,
    filteredProducts: []
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
        return params.typeProducts;
      }),
      mergeMap(typeProducts => this.productService.getProductsSameType(typeProducts)))
      .subscribe((data: any) => {
        this.state.products = data;
        this.state.filteredProducts = data;
        this.ProductCatalogService.filteredProducts(this.state.filteredProducts);

        let prices = [];
        let brands = [];

        for (let i = 0; i < data.length; i++) {
          prices.push(data[i].price);
          brands.push(data[i].brand);
        }

        this.state.minPrice = this.arrayMin(prices);
        this.state.maxPrice = this.arrayMax(prices);

        // this.state.brands = Array.from(new Set(brands));

        this.state.brands = Array.from(new Set(brands))
          .map(brand => new Brand(brand, false, false));

        this.changeDetection.markForCheck();
      });
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

  sortChange(sortTitle?: [string, boolean]): void {

    if (sortTitle) {
      if (this.state.sortName !== sortTitle[0]) {
        this.state.sortName = sortTitle[0];
      }
      if (this.state.sortCheckArrowUp !== sortTitle[1]) {
        this.state.sortCheckArrowUp = sortTitle[1];
      }
    }

    if (this.state.sortName === 'default') {

      this.filtration();

    } else {
      if (this.state.sortCheckArrowUp) {
        this.state.filteredProducts.sort(this.compare(this.state.sortName));
      } else {
        this.state.filteredProducts.sort(this.compare(this.state.sortName, -1));
      }
    }
    this.changeDetection.markForCheck();
    this.ProductCatalogService.filteredProducts(this.state.filteredProducts);
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

  onBrandsChange($event: Brand[]): void {
    $event.map(brand => {
      if (!brand.disabled && brand.checked) {
        this.state.appliedBrands.push(brand.value);
      }
    });

    if (this.state.appliedBrands.length !== 0) {
      this.state.appliedBrands = Array.from(new Set(this.state.appliedBrands));
      this.filtration();
    } else {
      this.state.filteredProducts = this.state.products;
      this.sortChange();
    }
  }

  filtration(): void {
    let prod = [];
    this.state.products.map(product => {
      if (product.price >= this.state.minPrice &&
        product.price <= this.state.maxPrice) {
        prod.push(product);
      }
    });

    if (this.state.appliedBrands.length !== 0 ) {
      this.state.filteredProducts = prod.filter(e => this.state.appliedBrands.includes(e.brand));
    } else {
      this.state.filteredProducts = prod;
    }
    this.ProductCatalogService.filteredProducts(this.state.filteredProducts);
  }
}
