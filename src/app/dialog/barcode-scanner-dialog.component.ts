import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'barcode-scanner-dialog',
  template: `
    <form>
      <div class="modal-body">
        <zxing-scanner #scanner
          [enable]="scannerEnabled"
          [(device)]="desiredDevice"
        ></zxing-scanner>
      </div>
      <div class="modal-footer">
        <select class="form-control"
                (change)="onCameraSelected($event.target.value)">
          <option *ngFor="let availableDevice of availableDevices"
                  [selected]="desiredDevice.deviceId == availableDevice.deviceId"
                  [value]="availableDevice.deviceId">{{availableDevice.label}}
          </option>
        </select>
      </div>
    </form>
  `,
  styles: [
    '.btn-cool { background: linear-gradient(#a8385d, #C24770); color: #fff; }'
  ]
})
export class BarcodeScannerDialogComponent implements OnInit {
  @ViewChild('scanner', { static: true })
  scanner: ZXingScannerComponent;

  scannerEnabled: boolean = true;
  availableDevices: MediaDeviceInfo[];
  desiredDevice: MediaDeviceInfo = null;

  constructor(private activeModal: NgbActiveModal) { }


  ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.availableDevices = devices;
      this.desiredDevice = null;

      if (this.availableDevices.length > 1) {
        const defaultCamera = this.availableDevices.filter(e => e.label.toLocaleLowerCase().indexOf('back') > -1);
        if (defaultCamera !== null && defaultCamera !== undefined) {
          this.desiredDevice = defaultCamera[0];
        } else {
          this.desiredDevice = this.availableDevices[0];
        }
      } else {
        this.desiredDevice = this.availableDevices[0];
      }
    });

    this.scanner.scanSuccess.subscribe(result => this.activeModal.close(result));
  }

  onCameraSelected(deviceId: string): void {
    let items = this.availableDevices.filter((availableCamera: MediaDeviceInfo) => {
      return availableCamera.deviceId == deviceId;
    });

    if (!items || !items.length)
      return;

    //this.scanner.resetCodeReader();
    this.desiredDevice = items[0];
  }

}
