import { Injectable } from '@angular/core';
import { WebRequestService } from "./web-request.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private webReqService: WebRequestService,
  ) { }

  getProducts(): Observable<Object> {
    return this.webReqService.get("product");
  }

  getOneProduct(id: string): Observable<Object> {
    return this.webReqService.get(`product/${id}`);
  }
}
