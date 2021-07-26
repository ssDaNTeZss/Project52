import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {of, Subscription} from "rxjs";
import {SignupService} from "../services/signup.service";
import {confirmPasswordValidator} from "../validators/confirmPassword.validator";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-signup-form-ui',
  templateUrl: './signup-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent implements OnInit, OnDestroy {

  private subs: Subscription;
  formModelSignUp: FormGroup;
  openSignupForm = false;
  showValidationError = false;
  validationError: string;
  showPopup = false;

  constructor(
    private signupService: SignupService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

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
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
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

  onSubmitForm() {
    const FMS = this.formModelSignUp.value,
      email = FMS.email,
      password = FMS.passwords.password,
      username = FMS.username;

    this.signupService.signup(email, password, username)
      .pipe(catchError((e: HttpErrorResponse) => {
        if (e.status === 400) {
          console.log("400");
          this.showValidationError = true;
          this.validationError = e.error;
          this.changeDetection.markForCheck();
          return of(null);
        }
        if (e.status === 200) {
          console.log("200");
          this.showPopup = true;
          this.changeDetection.markForCheck();
          return of(null);
        }
      }))
      .subscribe(() => {
      });
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
  }
}
