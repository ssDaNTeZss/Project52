import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = environment.apiUrl;
  }

  get<T>(uri: string, payload?: Object) {
    return this.http.get<T>(`${this.ROOT_URL}/${uri}`, payload);
  }

  post<T>(uri: string, payload: Object) {
    return this.http.post<T>(`${this.ROOT_URL}/${uri}`, payload);
  }

  put<T>(uri: string, payload: Object) {
    return this.http.put<T>(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete<T>(uri: string) {
    return this.http.delete<T>(`${this.ROOT_URL}/${uri}`);
  }

  signup(email: string, password: string, username: string) {
    return this.http.post(`${this.ROOT_URL}/auth/create`, {
      "email": email,
      "password": password,
      "username": username
    }, {
      observe: "response"
    });
  }

  login(username: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/auth/login`, {
      "username": username,
      "password": password
    }, {
      observe: "response"
    });
  }
}
