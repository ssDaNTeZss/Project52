import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  constructor(
    private changeDetection: ChangeDetectorRef,
  ) {
    this.changeDetection.markForCheck();
  }
}
