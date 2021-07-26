import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {of, Subscription} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../validators/confirmPassword.validator";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login-form-ui',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  private subs: Subscription;

  constructor(
    private loginService: LoginService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  formModelLogin: FormGroup;

  ngOnInit(): void {
    this.formModelLogin = new FormGroup({
      username: new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(2)
        ],
      ),
      password: new FormControl(
        "",
        [
          Validators.required,
        ],
      )
    });
  }

  closeLoginForm() {
    this.loginService.openLoginForm(false);
  }

  get _username(): AbstractControl {
    return this.formModelLogin.get("username");
  }

  get _password(): AbstractControl {
    return this.formModelLogin.get("password");
  }

  onSubmitForm() {
    const FMS = this.formModelLogin.value,
      username = FMS.username,
      password = FMS.password;

    console.log(username, password)

    // this.signupService.signup(email, password, username)
    //   .pipe(catchError((e: HttpErrorResponse) => {
    //     if (e.status === 400) {
    //       console.log("400");
    //       this.showValidationError = true;
    //       this.validationError = e.error;
    //       this.changeDetection.markForCheck();
    //       return of(null);
    //     }
    //     if (e.status === 200) {
    //       console.log("200");
    //       this.showPopup = true;
    //       this.changeDetection.markForCheck();
    //       return of(null);
    //     }
    //   }))
    //   .subscribe(() => {
    //   });
  }
}
