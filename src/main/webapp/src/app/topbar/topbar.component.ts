import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SimpleService} from "../simple.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  // styleUrls: ['./topbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {

  statusNavbar = false;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private simpleService: SimpleService,
  ) {  }

  ngOnInit(): void {
  }

  openNavbar() {
    this.statusNavbar = !this.statusNavbar;
    this.simpleService.openNavbar(this.statusNavbar);
    this.changeDetection.detectChanges();
  }
}
