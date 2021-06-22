import {Inject, Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
  ) { }

  getCookie(name: string): Observable<string> {
    let newName = name + "=";
    let decodedCookie = decodeURIComponent(this.documentRef.cookie);
    let splitDecodedCookie = decodedCookie.split(';');
    for(let i = 0; i < splitDecodedCookie.length; i++) {
      let oneDecodedCookie = splitDecodedCookie[i];
      while (oneDecodedCookie.charAt(0) === ' ') {
        oneDecodedCookie = oneDecodedCookie.substring(1);
      }
      if (oneDecodedCookie.indexOf(newName) === 0) {
        return of(oneDecodedCookie.substring(newName.length, oneDecodedCookie.length));
      }
    }
    return of("");
  }

  setCookie(name: string, value: string): void {
    this.documentRef.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  }
}
