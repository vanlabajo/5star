import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'barcode-scanner-dialog',
  template: `
    <form>
      <div class="modal-body">
        <zxing-scanner #scanner
          [tryHarder]="true"
          [(device)]="desiredDevice"
          [formats]="allowedFormats"
          [videoConstraints]="videoConstraints"
          [timeBetweenScans]="timeBetweenScans"
          (camerasFound)="onCamerasFound($event)"
          (scanSuccess)="onScanSuccess($event)"
        ></zxing-scanner>
      </div>
      <div class="modal-footer">
        <select class="form-control" #devices
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
  @ViewChild('devices') devices: ElementRef;

  availableDevices: MediaDeviceInfo[];
  desiredDevice: MediaDeviceInfo = null;
  allowedFormats: BarcodeFormat[];
  videoConstraints: MediaTrackConstraints;
  timeBetweenScans: number;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128];
    this.videoConstraints = {
      width: { min: 640, ideal: 1920 },
      height: { min: 400, ideal: 1080 },
      aspectRatio: { ideal: 1.7777777778 }
    };
    this.timeBetweenScans = 100; //100ms
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
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

    this.devices.nativeElement.blur();
  }

  onScanSuccess(scanResult: string): void {
    this.activeModal.close(scanResult);
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
