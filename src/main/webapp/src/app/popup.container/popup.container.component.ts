import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PopupService} from "../services/popup.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupContainerComponent implements OnInit, OnDestroy {

  private subs: Subscription;

  constructor(
    private popupService: PopupService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  popup = {
    openPopup: false,
    name: "",
    action: ""
  };

  ngOnInit(): void {
    this.subs = this.popupService.openPopup$.subscribe((popup: {
      openPopup: boolean,
      name: string,
      action: string
    }) => {
      this.popup = popup;

      setInterval(() => {
        this.popup.openPopup = false;
        this.changeDetection.markForCheck();
      }, 4000);

      this.changeDetection.markForCheck();
    })
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
