import { Component, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <i class="bi" [class]="toast.bootstrapIcon || 'bi-info-circle'"></i>
      &nbsp; {{ toast.text }}
    </ngb-toast>
  `,
  host: { '[class.ngb-toasts]': 'true' },
  styles: ['.bg-cool { background: linear-gradient(#a8385d, #C24770); }']
})
export class ToastsContainerComponent {
  constructor(public toastService: ToastService) { }
}
