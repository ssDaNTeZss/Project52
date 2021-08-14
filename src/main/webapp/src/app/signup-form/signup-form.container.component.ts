import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SignupService} from "../services/signup.service";
import {of, Subscription} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormContainerComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  constructor(
    private signupService: SignupService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  openSignupForm = false;
  state = {
    showValidationError: false,
    validationError: ""
  };

  ngOnInit(): void {
    this.subs = this.signupService.openSignupForm$.subscribe((openSignupForm: boolean) => {
      this.openSignupForm = openSignupForm;
      this.changeDetection.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  signUp($stateOfForm: { email: string; password: string; username: string }): void {
    this.signupService.signup($stateOfForm.email, $stateOfForm.password, $stateOfForm.username)
      .pipe(catchError((e: HttpErrorResponse) => {
        if (e.status === 400) {
          this.state.showValidationError = true;
          this.state.validationError = e.error;

          this.signupService.validErr(this.state);

          this.changeDetection.markForCheck();
          return of(null);
        }
        if (e.status === 200) {
          this.signupService.openSignupPopup(true);
          this.changeDetection.markForCheck();
          return of(null);
        }
      }))
      .subscribe(() => {
      });
  }
}
