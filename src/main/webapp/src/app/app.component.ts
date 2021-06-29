import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Shop52';

  constructor(private translateService: TranslateService) {}
  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }
}
