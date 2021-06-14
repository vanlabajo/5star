import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { BarcodeScannerDialogComponent } from './barcode-scanner-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private modalService: NgbModal) { }

  confirm$(message?: string, title?: string): Observable<boolean> {
    const confirmation = this.modalService.open(ConfirmationDialogComponent, { centered: true, backdrop: 'static' });
    confirmation.componentInstance.confirmationBoxTitle = title || 'Confirm?';
    confirmation.componentInstance.confirmationMessage = message || 'Do you want to proceed?';

    return confirmation.closed;
  }

  scanBarcode$(): Observable<string> {
    const scanner = this.modalService.open(BarcodeScannerDialogComponent, { centered: true });
    return scanner.closed;
  }
}
