import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public openPopup$ = new Subject<{
    openPopup: boolean,
    name?: string,
    action: string
  }>();

  public openPopup(openPopup: {
    openPopup: boolean,
    name?: string,
    action: string
  }): void {
    this.openPopup$.next(openPopup);
  }

  constructor() {
  }
}
