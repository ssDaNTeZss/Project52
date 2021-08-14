import { Injectable } from '@angular/core';
import { WebRequestService } from "./web-request.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private webReqService: WebRequestService,
  ) { }

  getProducts(): Observable<Product[]> {
    return this.webReqService.get<Product[]>("products");
  }

  getProductsSameType(category: string): Observable<Product[]> {
    const params = new HttpParams()
      .set('category', category);
    return this.webReqService.get<Product[]>("products", { params });
  }

  getOneProduct(id: number): Observable<Product> {
    return this.webReqService.get<Product>(`products/${id}`);
  }
}
