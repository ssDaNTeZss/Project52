import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OpenNavbarService} from "../../services/open-navbar.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {

  statusNavbar = false;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private openNavbarService: OpenNavbarService,
  ) {  }

  ngOnInit(): void {
  }

  openNavbar() {
    this.statusNavbar = !this.statusNavbar;
    this.openNavbarService.openNavbar(this.statusNavbar);
    this.changeDetection.detectChanges();
  }
}
