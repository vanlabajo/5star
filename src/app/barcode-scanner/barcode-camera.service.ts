import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BarcodeCameraService {
  private hasNavigator: boolean;
  private isMediaDevicesSupported: boolean;
  private constraints: MediaStreamConstraints;
  private localStream: MediaStream;
  private isRequestingMediaStream: boolean;

  constructor() {
    this.hasNavigator = typeof navigator !== 'undefined';
    this.isMediaDevicesSupported = this.hasNavigator && !!navigator.mediaDevices;
    this.constraints = {
      audio: false,
      video: {
        facingMode: 'environment',
        width: { min: 640, ideal: 1920 },
        height: { min: 400, ideal: 1080 },
        aspectRatio: { ideal: 1.7777777778 }
      }
    };

    this.localStream = null;
    this.isRequestingMediaStream = false;
  }

  async getUserMedia(): Promise<MediaStream> {
    if (!this.hasNavigator) {
      console.error('Can\'t ask for permission, navigator is not present.');
      return null;
    }

    if (!this.isMediaDevicesSupported) {
      console.error('Can\'t get user media, this is not supported.');
      return null;
    }

    if (!this.localStream) {
      try {
        this.isRequestingMediaStream = true;
        this.localStream = await navigator.mediaDevices.getUserMedia(this.constraints);
      } catch (err) {
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
      } finally {
        this.isRequestingMediaStream = false;
      } 
    }

    return this.localStream;
  }

  terminateStream() {
    if (this.isRequestingMediaStream) {
      const tryId = setInterval(() => {
        if (this.localStream) {
          this.localStream.getTracks().forEach(t => t.stop());
          this.localStream = null;
          clearInterval(tryId);
        }
      }, 500);
    }
    else {
      if (this.localStream) {
        this.localStream.getTracks().forEach(t => t.stop());
        this.localStream = null;
      }
    }    
  }
}
