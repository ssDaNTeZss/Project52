import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OpenNavbarService {
  public openNavbar$ = new Subject<boolean>();

  public openNavbar(openNavbar: boolean): void {
    this.openNavbar$.next(openNavbar);
  }
}
