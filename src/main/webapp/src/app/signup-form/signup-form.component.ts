import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup-form-ui',
  templateUrl: './signup-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent implements OnInit {

  formModelSignUp: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.formModelSignUp = new FormGroup({
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
      ),
      reEnterPassword: new FormControl(
        "",
        [
          Validators.required,
        ],
      ),
      email: new FormControl(
        "",
        [
          Validators.required,
          Validators.email
        ],
      )
    });
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
    return this.formModelSignUp.get("password");
  }

  get _reEnterPassword(): AbstractControl {
    return this.formModelSignUp.get("reEnterPassword");
  }

  get _email(): AbstractControl {
    return this.formModelSignUp.get("email");
  }

  onSubmitForm() {
    console.log(this._username.errors?.minlength)
    console.log(this._username.errors?.minlength.minlength)
    console.log(this._username.errors?.minlength.min)
    console.log(this._username.errors?.minLength)
    console.log(this._username.errors?.minlength.minLength)
    console.log(this._username.errors?.minlength.min)
  }
}
