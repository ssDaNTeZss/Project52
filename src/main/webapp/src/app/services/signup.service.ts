import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {WebRequestService} from "./web-request.service";
import {HttpResponse} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  public openSignupForm$ = new Subject<boolean>();
  public openSignupPopup$ = new Subject<boolean>();
  public validErr$ = new Subject<{showValidationError: boolean, validationError: string}>();

  public openSignupForm(openSignupForm: boolean): void {
    this.openSignupForm$.next(openSignupForm);
  }

  public openSignupPopup(openSignupPopup: boolean): void {
    this.openSignupPopup$.next(openSignupPopup);
  }

  public validErr(validErr: {showValidationError: boolean, validationError: string}): void {
    this.validErr$.next(validErr);
  }

  constructor(
    private webReqService: WebRequestService,
  ) { }

  signup(email: string, password: string, username: string): Observable<HttpResponse<any>> {
    return this.webReqService.signup(email, password, username).pipe(
      tap((res: HttpResponse<any>) => {
        console.log("Successfully signed up and now logged in!");
      }),
    );
  }
}
