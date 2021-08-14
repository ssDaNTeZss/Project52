import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popup-ui',
  templateUrl: './popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent implements OnInit {

  @Input() popup = {
    openPopup: false,
    name: "",
    action: ""
  };

  constructor(
    private changeDetection: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.popup.openPopup = false;
      this.changeDetection.markForCheck();
    }, 4000);
  }

}
