import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="fixed-above-nav-bar" *ngIf="spinnerService.requestCount > 0">
      <img src="assets/logo-web.png" alt="Loading" style="width:60px" />
    </div>
  `,
  styles: [
    '.fixed-above-nav-bar { position: fixed; z-index: 1030; right: 0; bottom: 100px; opacity: 0; animation: .75s linear infinite spinner-grow;'
  ]
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) { }
}
