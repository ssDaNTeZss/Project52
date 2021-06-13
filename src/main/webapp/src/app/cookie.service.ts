import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  getCookie(cname: string): Observable<string> {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        // console.log(c.substring(name.length, c.length));
        return of(c.substring(name.length, c.length));
      }
    }
    return of("");
  }

  setCookie(name: string, value: string): void {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  }


}
