import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleService} from "../simple.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  // styleUrls: ['./navbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subs: Subscription;
  statusNavbar = false;


  constructor(
    private simpleService: SimpleService,
    private changeDetection: ChangeDetectorRef,
  ) {
    // this.changeDetection.detach();
  }

  ngOnInit(): void {
    this.simpleService.openNavbar$.subscribe((status: boolean) => {
      this.statusNavbar = !this.statusNavbar;
      this.changeDetection.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
