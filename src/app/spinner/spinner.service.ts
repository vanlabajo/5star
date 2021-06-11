import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  loading$ = new Subject<boolean>();

  private queue: HttpRequest<any>[] = [];

  startRequestHandling(req: HttpRequest<any>) {
    this.queue.push(req);
    this.notify();
  }

  stopRequestHandling(req: HttpRequest<any>) {
    this.queue = this.queue.filter(queuedReq => queuedReq !== req);
    this.notify();
  }

  private notify() {
    this.loading$.next(this.hasRequests);
  }

  private get hasRequests() {
    return this.queue.length > 0;
  }
}
