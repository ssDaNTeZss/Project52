import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {ReplaySubject} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login-form-ui',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit, OnDestroy {

  @Output() stateOfForm = new EventEmitter<{ username: string, password: string }>();

  constructor(
    private loginService: LoginService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  formModelLogin: FormGroup;
  showValidationError = false;
  validationError: string;
  showPopup = false;
  userData: User;
  _timer: number;

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

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

    this.loginService.validErr$.pipe(takeUntil(this.destroy)).subscribe((validErr: {showValidationError: boolean, validationError: string}) => {
      this.showValidationError = validErr.showValidationError;
      this.validationError = validErr.validationError;
      this.changeDetection.markForCheck();
    });

    this.loginService.setUserState$.pipe(takeUntil(this.destroy)).subscribe((data: User) => {
      this.userData = data;
      this.changeDetection.markForCheck();
    });

    this.loginService.openLoginPopup$.pipe(takeUntil(this.destroy)).subscribe((openLoginPopup: boolean) => {
      if (openLoginPopup) {
        this.showPopup = openLoginPopup;
        this.changeDetection.markForCheck();

        this._timer = setTimeout(() => {
          this.closeLoginForm();
        }, 3000);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
    if (this._timer){
      clearTimeout(this._timer);
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
