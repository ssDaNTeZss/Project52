import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleService} from "../simple.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subs: Subscription;
  statusNavbar = false;


  constructor(
    private simpleService: SimpleService,
  ) { }

  ngOnInit(): void {
    this.simpleService.openNavbar$.subscribe((status: boolean) => {
      this.statusNavbar = !this.statusNavbar;
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
