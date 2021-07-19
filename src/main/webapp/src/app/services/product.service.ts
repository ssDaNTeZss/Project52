import { Injectable } from '@angular/core';
import { WebRequestService } from "./web-request.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private webReqService: WebRequestService,
  ) { }

  getProducts(): Observable<Object> {
    return this.webReqService.get("products");
  }

  getProductsSameType(category: string): Observable<Object> {
    const params = new HttpParams()
      .set('category', category);
    return this.webReqService.get("products", { params });
  }

  getOneProduct(id: number): Observable<Object> {
    return this.webReqService.get(`products/${id}`);
  }
}
