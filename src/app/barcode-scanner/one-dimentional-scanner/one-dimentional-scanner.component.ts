import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { BarcodeFormat, BinaryBitmap, DecodeHintType, HTMLCanvasElementLuminanceSource, HybridBinarizer } from '@zxing/library';
import { BarcodeCameraService } from '../barcode-camera.service';

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
  private barcodeReader: BrowserMultiFormatReader;

  constructor(
    private barcodeCameraService: BarcodeCameraService
  ) {
    this.scanSuccess = new EventEmitter();
    this.scanError = new EventEmitter();
    this.scanComplete = new EventEmitter();
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

  async ngAfterViewInit() {
    const video = this.videoElemRef.nativeElement;
    video.addEventListener('play', () => {

      this.centerFrame();
      this.ready = true;
      // start barcode reader process
      this.scanFrame();
    });

    video.srcObject = await this.barcodeCameraService.getUserMedia();
  }

  ngOnDestroy() {
    this.barcodeCameraService.terminateStream();
    this.barcodeReader = undefined;
  }

  private centerFrame(): void {
    setTimeout(() => {
      const video = this.videoElemRef.nativeElement;

      const rect = video.getBoundingClientRect();
      const width = rect.width - (rect.width * 0.15);
      const height = width / 2;
      const left = rect.left + ((rect.width - width) / 2);
      const top = rect.top + ((rect.height - height) / 2);

      const frame = this.frameElemRef.nativeElement;
      frame.style.width = width + 'px';
      frame.style.height = height + 'px';
      frame.style.left = left + 'px';
      frame.style.top = top + 'px';
    }, 500);
  };

  private scanFrame(): void {
    const video = this.videoElemRef.nativeElement;

    if (video.srcObject) {     

      // crop the video stream according to frame
      const width = video.videoWidth - (video.videoWidth * 0.15);
      const height = width / 2;
      const left = (video.videoWidth - width) / 2;
      const top = (video.videoHeight - height) / 2;

      const canvas = this.canvasElemRef.nativeElement;
      canvas.width = Math.ceil(video.videoWidth - (video.videoWidth * 0.15));
      canvas.height = Math.ceil(width / 2);
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
        this.barcodeCameraService.terminateStream();
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
