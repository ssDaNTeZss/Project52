import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {OpenNavbarService} from "../../services/open-navbar.service";
import {SignupService} from "../../services/signup.service";
import {LoginService} from "../../services/login.service";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {

  statusNavbar = false;
  openAccMenu = false;
  scrWidth: number;
  accountMenuRight: string;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private openNavbarService: OpenNavbarService,
    private signupService: SignupService,
    private loginService: LoginService,
    private basketService: BasketService,
  ) {  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    if (this.scrWidth > 1164) {
      this.accountMenuRight = (this.scrWidth - 1164) / 2 + "px";
      this.changeDetection.markForCheck();
    }
  }

  ngOnInit(): void {
  }

  openNavbar(): void {
    this.statusNavbar = !this.statusNavbar;
    this.openNavbarService.openNavbar(this.statusNavbar);
    this.changeDetection.markForCheck();
  }

  openAccountMenu(): void {
    this.openAccMenu = !this.openAccMenu;
  }

  openSignupForm(): void {
    this.signupService.openSignupForm(true);
    this.openAccountMenu();
  }

  openLoginForm(): void {
    this.loginService.openLoginForm(true);
    this.openAccountMenu();
  }

  openBasket(): void {
    this.basketService.openBasket(true);
  }
}
