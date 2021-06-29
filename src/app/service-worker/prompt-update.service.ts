import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DialogService } from '../dialog/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {

  constructor(
    private updates: SwUpdate,
    private dialog: DialogService
  ) {
    this.updates.available
      .subscribe(() => {

        this.dialog.confirm$('A new version is available. Would you like to update?', 'Update?')
          .subscribe(confirm => {
            if (confirm) {
              updates.activateUpdate().then(() => document.location.reload());
            }
          });

    });
  }
}
