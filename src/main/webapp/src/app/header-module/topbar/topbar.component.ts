import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OpenNavbarService} from "../../services/open-navbar.service";
import {SignupService} from "../../services/signup.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {

  statusNavbar = false;
  openAccMenu = false;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private openNavbarService: OpenNavbarService,
    private signupService: SignupService,
  ) {  }

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
}
