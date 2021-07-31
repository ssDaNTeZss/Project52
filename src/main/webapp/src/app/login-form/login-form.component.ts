import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Subscription} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form-ui',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit, OnDestroy {

  @Output() stateOfForm = new EventEmitter<{ username: string, password: string }>();

  private subs: Subscription;

  constructor(
    private loginService: LoginService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  formModelLogin: FormGroup;
  showValidationError = false;
  validationError: string;
  showPopup = false;
  userData: {
    "id": 0,
    "username": "",
    "password": null,
    "email": null
  };

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

    this.subs = this.loginService.validErr$.subscribe((validErr: any) => {
      this.showValidationError = validErr.showValidationError;
      this.validationError = validErr.validationError;
      this.changeDetection.markForCheck();
    });

    this.subs = this.loginService.setUserState$.subscribe((data: any) => {
      this.userData = data;
      this.changeDetection.markForCheck();
    });

    this.subs = this.loginService.openLoginPopup$.subscribe((openLoginPopup: boolean) => {
      if (openLoginPopup) {
        this.showPopup = openLoginPopup;
        this.changeDetection.markForCheck();

        setTimeout(() => {
          this.closeLoginForm();
        }, 3000);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  closeLoginForm(): void {
    this.loginService.openLoginForm(false);
    this.showPopup = false;
    this.changeDetection.markForCheck();
  }

  get _username(): AbstractControl {
    return this.formModelLogin.get("username");
  }

  get _password(): AbstractControl {
    return this.formModelLogin.get("password");
  }

  onSubmitForm(): void {
    const FMS = this.formModelLogin.value,
      usernameAndPassword = {
        username: FMS.username,
        password: FMS.password
      };

    this.stateOfForm.emit(usernameAndPassword);
  }
}