import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    // this.ROOT_URL = "http://localhost:3000";
    this.ROOT_URL = environment.apiUrl;
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  put(uri: string, payload: Object) {
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
