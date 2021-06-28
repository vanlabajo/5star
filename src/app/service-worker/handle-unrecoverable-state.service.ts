import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class HandleUnrecoverableStateService {

  constructor(
    private updates: SwUpdate,
    private toast: ToastService,
  ) {
    this.updates.unrecoverable
      .subscribe(event => {
        this.toast.showError(`An error occurred that we cannot recover from:\n${event.reason}\n\n` +
          'Please reload the page.');
      });
  }
}
