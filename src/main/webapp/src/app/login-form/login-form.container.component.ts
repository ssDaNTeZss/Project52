import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {of, Subscription} from "rxjs";
import {LoginService} from "../services/login.service";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormContainerComponent implements OnInit {

  private subs: Subscription;

  constructor(
    private loginService: LoginService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  openLoginForm = false;
  state = {
    showValidationError: false,
    validationError: ""
  };

  ngOnInit(): void {
    this.subs = this.loginService.openLoginForm$.subscribe((openLoginForm: boolean) => {
      this.openLoginForm = openLoginForm;
      this.changeDetection.markForCheck();
    })
  }

  signIn($stateOfForm: { username: string, password: string }): void {
    this.loginService.login($stateOfForm.username, $stateOfForm.password)
      .pipe(catchError((e: HttpErrorResponse) => {
        if (e.status === 403) {
          this.state.showValidationError = true;
          this.state.validationError = "Invalid username or password!";

          this.loginService.validErr(this.state);

          this.changeDetection.markForCheck();
          return of(null);
        }
        if (e.status === 200) {
          this.loginService.openLoginPopup(true);
          return of(null);
        }
      }))
      .subscribe((data: any) => {
        if (data) {
          this.loginService.setUserState(data?.body);
          this.loginService.openLoginPopup(true);
        }
      });
  }
}
