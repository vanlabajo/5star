import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  requestCount: number = 0;

  show() {
    this.requestCount += 1;
  }

  hide() {
    if (this.requestCount > 0)
      this.requestCount -= 1;
  }
}
