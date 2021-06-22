import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  constructor(
    private changeDetection: ChangeDetectorRef,
  ) {
    this.changeDetection.detach();
  }

  ngOnInit(): void {
    this.changeDetection.detectChanges();
  }

}
