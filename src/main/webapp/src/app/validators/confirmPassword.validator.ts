import {AbstractControl, ValidatorFn} from "@angular/forms";

export function confirmPasswordValidator(): ValidatorFn {
  return (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {

    const password = control.value.password,
      reEnterPassword = control.value.reEnterPassword;

    if (password.trim() != "" && reEnterPassword.trim() != ""
      && password !== reEnterPassword) {

      control.get('reEnterPassword').setErrors({ NoPasswordMatch: true });
      return { NoPasswordMatch: true };
    }
    return null;
  }
}
