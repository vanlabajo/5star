import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { BarcodeFormat, BinaryBitmap, DecodeHintType, HTMLCanvasElementLuminanceSource, HybridBinarizer } from '@zxing/library';

@Component({
  selector: 'one-dimentional-scanner',
  templateUrl: './one-dimentional-scanner.component.html',
  styleUrls: ['./one-dimentional-scanner.component.css']
})
export class OneDimentionalScannerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasElemRef: ElementRef<HTMLCanvasElement>;
  @ViewChild('video', { static: true }) videoElemRef: ElementRef<HTMLVideoElement>;
  @ViewChild('frame', { static: true }) frameElemRef: ElementRef<HTMLDivElement>;
  @Output() scanSuccess: EventEmitter<string>;
  @Output() scanError: EventEmitter<Error>;
  @Output() scanComplete: EventEmitter<void>;

  ready: boolean = false;

  private timeout: number = 500;
  private hasNavigator: boolean;
  private isMediaDevicesSupported: boolean;
  private barcodeReader: BrowserMultiFormatReader;
  private stream: MediaStream;

  constructor() {
    this.scanSuccess = new EventEmitter();
    this.scanError = new EventEmitter();
    this.scanComplete = new EventEmitter();
    this.hasNavigator = typeof navigator !== 'undefined';
    this.isMediaDevicesSupported = this.hasNavigator && !!navigator.mediaDevices;
  }

  ngOnInit(): void {
    const formats = [BarcodeFormat.EAN_13, BarcodeFormat.CODE_128];
    const hints = new Map<DecodeHintType, any>();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    this.barcodeReader = new BrowserMultiFormatReader(hints, {
      delayBetweenScanSuccess: 500,
      delayBetweenScanAttempts: 500
    });
  }

  ngAfterViewInit(): void {
    this.openStream();  
  }

  ngOnDestroy(): void {
    this.closeStream();
    this.barcodeReader = undefined;
    this.stream = undefined;
  }

  private async openStream() {

    if (!this.hasNavigator) {
      console.error('Can\'t ask for permission, navigator is not present.');
      return;
    }

    if (!this.isMediaDevicesSupported) {
      console.error('Can\'t get user media, this is not supported.');
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        audio: false, video: {
          facingMode: 'environment',
          width: { min: 640, ideal: 1920 },
          height: { min: 400, ideal: 1080 },
          aspectRatio: { ideal: 1.7777777778 }
        }
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

      const video = this.videoElemRef.nativeElement;
      video.addEventListener('play', () => {

        this.centerFrame();
        this.ready = true;
        // start barcode reader process
        this.scanFrame();
      });

      video.srcObject = this.stream;
    }
    catch (err) {
      switch (err.name) {
        case 'NotSupportedError':
          console.warn('Usually caused by not secure origins.', err.message);
          break;
        case 'NotAllowedError':
          console.warn('User denied permission.', err.message);
          break;
        case 'NotFoundError':
          console.warn('No cameras found.', err.message);
          break;
        case 'NotReadableError':
          console.warn('Couldn\'t read the device(s)\'s stream, it\'s probably in use by another app.', err.message);
          break;
        default:
          console.warn('I was not able to define if I have permissions for the camera or not.', err);
          break;
      }
    }
  }

  private closeStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
  }

  private centerFrame(): void {
    const video = this.videoElemRef.nativeElement;

    const rect = video.getBoundingClientRect();
    const width = rect.width - (rect.width * 0.10);
    const height = width / 3;
    const left = rect.left + ((rect.width - width) / 2);
    const top = rect.top + ((rect.height - height) / 2);

    const frame = this.frameElemRef.nativeElement;
    frame.style.width = width + 'px';
    frame.style.height = height + 'px';
    frame.style.left = left + 'px';
    frame.style.top = top + 'px';
  };

  private scanFrame(): void {
    if (this.stream) {
      const video = this.videoElemRef.nativeElement;

      // crop the video stream according to frame
      const width = video.videoWidth - (video.videoWidth * 0.10);
      const height = width / 3;
      const left = (video.videoWidth - width) / 2;
      const top = (video.videoHeight - height) / 2;

      const canvas = this.canvasElemRef.nativeElement;
      canvas.width = width;
      canvas.height = height;
      const canvasContext = canvas.getContext('2d');
      canvasContext.rect(0, 0, width, height);
      canvasContext.fillStyle = 'white';
      canvasContext.fill();
      canvasContext.drawImage(video, left, top, width, height, 0, 0, width, height);

      const luminanceSource = new HTMLCanvasElementLuminanceSource(canvas);
      const hybridBinarizer = new HybridBinarizer(luminanceSource);

      const binaryBitmap = new BinaryBitmap(hybridBinarizer);

      try {
        const result = this.barcodeReader.decodeBitmap(binaryBitmap);
        this.scanSuccess.next(result.getText());
        this.closeStream();
      } catch (e) {
        this.scanError.next(e);
      } finally {
        this.scanComplete.next();
        setTimeout(() => this.scanFrame(), this.timeout); // repeat
      }

    }
  }

  @HostListener('window:resize')
  onResize() {
    this.centerFrame();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.centerFrame();
  }
}
