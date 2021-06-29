import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from "rxjs";
import { OpenNavbarService } from "../../services/open-navbar.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavbarComponent implements OnInit, OnDestroy {

  private subs: Subscription;
  statusNavbar = false;

  constructor(
    private openNavbarService: OpenNavbarService,
    private changeDetection: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.openNavbarService.openNavbar$.subscribe((status: boolean) => {
      this.statusNavbar = !this.statusNavbar;
      this.changeDetection.markForCheck();
    })
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
