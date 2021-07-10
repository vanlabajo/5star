import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="fixed-above-nav-bar" *ngIf="spinnerService.loading$ | async">
      <img src="assets/logo-web.png" alt="Loading" style="width:60px" />
    </div>
  `,
  styles: [
    '.fixed-above-nav-bar { position: fixed; z-index: 1030; right: 0; bottom: 9vh; opacity: 0; animation: .75s linear infinite spinner-grow; }',
    '@media (orientation: landscape) { .fixed-above-nav-bar { bottom: 19vh } }'
  ]
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) { }
}
