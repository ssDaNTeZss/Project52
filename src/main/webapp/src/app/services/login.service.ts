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

  public openLoginForm(openLoginForm: boolean): void {
    this.openLoginForm$.next(openLoginForm);
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
