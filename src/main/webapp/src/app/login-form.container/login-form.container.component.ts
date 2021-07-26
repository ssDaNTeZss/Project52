import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LoginService} from "../services/login.service";

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
  ) { }

  openLoginForm = false;

  ngOnInit(): void {
    this.subs = this.loginService.openLoginForm$.subscribe((openLoginForm: boolean) => {
      this.openLoginForm = openLoginForm;
      this.changeDetection.markForCheck();
    })
  }

}
