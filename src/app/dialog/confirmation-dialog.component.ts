import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirmation-dialog',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{confirmationBoxTitle}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{confirmationMessage}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-cool" (click)="activeModal.close(true)">Yes</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(false)">No</button>
    </div>
  `,
  styles: [
    '.btn-cool { background: linear-gradient(#a8385d, #C24770); color: #fff; }'
  ]
})
export class ConfirmationDialogComponent {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;

  constructor(public activeModal: NgbActiveModal) { }
}
