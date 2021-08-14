import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReplaySubject, Subscription} from "rxjs";
import {SignupService} from "../../services/signup.service";
import {confirmPasswordValidator} from "../../validators/confirmPassword.validator";
import {LoginService} from "../../services/login.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-signup-form-ui',
  templateUrl: './signup-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent implements OnInit, OnDestroy {

  @Output() stateOfForm = new EventEmitter<{
    email: string,
    password: string,
    username: string
  }>();

  constructor(
    private signupService: SignupService,
    private loginService: LoginService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  formModelSignUp: FormGroup;
  openSignupForm = false;
  showValidationError = false;
  validationError: string;
  showPopup = false;

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  ngOnInit(): void {
    this.formModelSignUp = new FormGroup({
      username: new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(2)
        ],
      ),
      passwords: new FormGroup({
        password: new FormControl(
          "",
          [
            Validators.required,
          ],
        ),
        reEnterPassword: new FormControl(
          "",
          [
            Validators.required,
          ],
        )
      }, [confirmPasswordValidator()]),
      email: new FormControl(
        "",
        [
          Validators.required,
          Validators.email
        ],
      )
    });

    this.signupService.validErr$.pipe(takeUntil(this.destroy)).subscribe((validErr: {showValidationError: boolean, validationError: string}) => {
      this.showValidationError = validErr.showValidationError;
      this.validationError = validErr.validationError;
      this.changeDetection.markForCheck();
    });

    this.signupService.openSignupPopup$.pipe(takeUntil(this.destroy)).subscribe((openSignupPopup: boolean) => {
      if (openSignupPopup) {
        this.showPopup = openSignupPopup;
        this.changeDetection.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formModelSignUp.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  get _username(): AbstractControl {
    return this.formModelSignUp.get("username");
  }

  get _password(): AbstractControl {
    return this.formModelSignUp.get("passwords.password");
  }

  get _reEnterPassword(): AbstractControl {
    return this.formModelSignUp.get("passwords.reEnterPassword");
  }

  get _email(): AbstractControl {
    return this.formModelSignUp.get("email");
  }

  onSubmitForm(): void {
    const FMS = this.formModelSignUp.value,
      signupInfo = {
      email: FMS.email,
      password: FMS.passwords.password,
      username: FMS.username
    };

    this.stateOfForm.emit(signupInfo);
  }

  closeSignupForm(): void {
    this.signupService.openSignupForm(false);
    this.showPopup = false;

    this.changeDetection.markForCheck();
  }

  backHome(): void {
    this.closeSignupForm();
  }

  signIn(): void {
    this.closeSignupForm();
    this.loginService.openLoginForm(true);
  }
}
