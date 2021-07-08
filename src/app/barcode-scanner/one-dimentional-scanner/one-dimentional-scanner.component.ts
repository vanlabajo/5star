import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BarcodeFormat, BinaryBitmap, BrowserBarcodeReader, DecodeHintType, HTMLCanvasElementLuminanceSource, HybridBinarizer, Result, RGBLuminanceSource } from '@zxing/library';

@Component({
  selector: 'one-dimentional-scanner',
  templateUrl: './one-dimentional-scanner.component.html',
  styleUrls: ['./one-dimentional-scanner.component.css']
})
export class OneDimentionalScannerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video', { static: true })
  videoElemRef: ElementRef<HTMLVideoElement>;

  @ViewChild('frame', { static: true })
  frameElemRef: ElementRef<HTMLDivElement>;

  @ViewChild('canvas', { static: true })
  canvasElemRef: ElementRef<HTMLCanvasElement>;

  //@ViewChild('image', { static: true })
  //imageElemRef: ElementRef<HTMLImageElement>;

  @Output()
  scanSuccess: EventEmitter<string>;

  @Output()
  scanError: EventEmitter<Error>;

  @Output()
  scanComplete: EventEmitter<void>;

  ready: boolean = false;

  private timeBetweenScans = 500; //500ms
  private delayBetweenScans = 500; //500ms
  private scaleWidth = 0.9;
  private scaleHeight = 0.15;
  private frameScaleWidth: number;
  private frameScaleHeight: number;
  private frameScaleLeft: number;
  private frameScaleTop: number;
  private hasNavigator: boolean;
  private isMediaDevicesSupported: boolean;
  private hints: Map<DecodeHintType, any> | null;
  private barcodeReader: BrowserBarcodeReader;
  private stream: MediaStream;

  constructor() {
    this.scanSuccess = new EventEmitter();
    this.scanError = new EventEmitter();
    this.scanComplete = new EventEmitter();
    this.hasNavigator = typeof navigator !== 'undefined';
    this.isMediaDevicesSupported = this.hasNavigator && !!navigator.mediaDevices;
    this.hints = new Map<DecodeHintType, any>();
  }

  ngOnInit(): void {
    const formats = [BarcodeFormat.EAN_13, BarcodeFormat.CODE_128];
    this.hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    this.hints.set(DecodeHintType.TRY_HARDER, true);
    this.barcodeReader = new BrowserBarcodeReader(this.timeBetweenScans, this.hints);
  }

  ngAfterViewInit(): void {
    this.openScanner();  
  }

  ngOnDestroy(): void {
    this.closeScanner();
    this.barcodeReader = undefined;
    this.stream = undefined;
  }

  private async openScanner() {

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

        this.updateCanvasAndFrame();
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

  private closeScanner() {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }

    this.barcodeReader.reset();
  }

  private updateCanvasAndFrame(): void {
    const video = this.videoElemRef.nativeElement;
    const canvas = this.canvasElemRef.nativeElement;
    // get video's intrinsic width and height, eg 640x480,
    // and set canvas to it to match.
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    this.frameScaleWidth = video.clientWidth * this.scaleWidth;
    this.frameScaleHeight = video.clientHeight * this.scaleHeight;
    this.frameScaleLeft = (video.clientWidth - this.frameScaleWidth) / 2;
    this.frameScaleTop = (video.clientHeight - this.frameScaleHeight) / 2;

    const frame = this.frameElemRef.nativeElement;
    // set position of orange frame in video
    frame.style.width = this.frameScaleWidth + 'px';
    frame.style.height = this.frameScaleHeight + 'px';
    frame.style.left = this.frameScaleLeft + 'px';
    frame.style.top = this.frameScaleTop + 'px';
  };

  private scanFrame(): void {
    if (this.stream) {
      const video = this.videoElemRef.nativeElement;      
      const canvas = this.canvasElemRef.nativeElement;
      // copy the video stream image onto the canvas
      canvas.getContext('2d').drawImage(
        video,
        // source x, y, w, h:
        this.frameScaleLeft,
        this.frameScaleTop,
        this.frameScaleWidth,
        this.frameScaleHeight,
        // dest x, y, w, h:
        0,
        0,
        canvas.width,
        canvas.height
      );

      //const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

      const luminanceSource = new HTMLCanvasElementLuminanceSource(canvas);
      const hybridBinarizer = new HybridBinarizer(luminanceSource);

      const binaryBitmap = new BinaryBitmap(hybridBinarizer);

      try {
        const result = this.barcodeReader.decodeBitmap(binaryBitmap);
        this.scanSuccess.next(result.getText());
        this.closeScanner();
      } catch (e) {
        this.scanError.next(e);
      } finally {
        this.scanComplete.next();
        setTimeout(() => this.scanFrame(), this.delayBetweenScans); // repeat
      }
    }
  }

  //@HostListener('window:resize')
  //onResize() {
  //  this.closeScanner();
  //  this.updateCanvas();
  //  this.centerFrame();
  //  this.scanFrame();
  //}
}
