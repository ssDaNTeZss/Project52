import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SignupService} from "../services/signup.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormContainerComponent implements OnInit, OnDestroy {

  private subs: Subscription;
  openSignupForm = false;

  constructor(
    private signupService: SignupService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

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
}
