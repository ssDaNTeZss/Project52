import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  // styleUrls: ['./main-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  constructor(
    private changeDetection: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

}
