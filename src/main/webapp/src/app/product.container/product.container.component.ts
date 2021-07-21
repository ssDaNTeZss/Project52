import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {map, mergeMap} from "rxjs/operators";
import {Brand} from "../models/brand.model";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductContainerComponent implements OnInit {

  productId: number;
  product: Product;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => {
        this.productId = params.idProduct;
        return params.idProduct;
      }),
      mergeMap(idProduct => this.productService.getOneProduct(idProduct)))
      .subscribe((data: any) => {

        this.product = data;
        console.log(this.product);
        this.changeDetection.markForCheck();
      });
  }

}
