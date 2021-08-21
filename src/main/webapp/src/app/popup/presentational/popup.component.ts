import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-popup-ui',
  templateUrl: './popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent implements OnInit, OnDestroy {

  @Input() popup = {
    openPopup: false,
    name: "",
    action: ""
  };

  constructor(
    private changeDetection: ChangeDetectorRef,
  ) { }

  _timer: number;

  ngOnInit(): void {
    this._timer = setInterval(() => {
      this.popup.openPopup = false;
      this.changeDetection.markForCheck();
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this._timer){
      clearTimeout(this._timer);
    }
  }
}
