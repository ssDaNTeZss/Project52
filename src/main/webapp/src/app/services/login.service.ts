import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {WebRequestService} from "./web-request.service";
import {HttpResponse} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public openLoginForm$ = new Subject<boolean>();
  public openLoginPopup$ = new Subject<boolean>();
  public validErr$ = new Subject<{showValidationError: boolean, validationError: string}>();

  public setUserState$ = new Subject<any>();

  public openLoginPopup(openLoginPopup: boolean): void {
    this.openLoginPopup$.next(openLoginPopup);
  }

  public openLoginForm(openLoginForm: boolean): void {
    this.openLoginForm$.next(openLoginForm);
  }

  public validErr(validErr: {showValidationError: boolean, validationError: string}): void {
    this.validErr$.next(validErr);
  }

  public setUserState(setUserState: any): void {
    this.setUserState$.next(setUserState);
  }

  constructor(
    private webReqService: WebRequestService,
  ) { }

  login(username: string, password: string): Observable<HttpResponse<any>> {
    return this.webReqService.login(username, password).pipe(
      tap((res: HttpResponse<any>) => {
        console.log("Successfully logged in!");
      }),
    );
  }
}
