import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
