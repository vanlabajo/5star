import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private modalService: NgbModal) { }

  confirm(message?: string, title?: string): Observable<boolean> {
    const confirmation = this.modalService.open(ConfirmationDialogComponent, { centered: true, backdrop: 'static' });
    confirmation.componentInstance.confirmationBoxTitle = title || 'Confirm?';
    confirmation.componentInstance.confirmationMessage = message || 'Do you want to proceed?';

    return from(confirmation.result);
  }
}
