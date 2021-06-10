import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { SpinnerService } from "../spinner/spinner.service";

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.reportProgress) {
      // only intercept when the request is configured to report its progress
      return next.handle(req)
        .pipe(
          tap((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                this.spinnerService.show();
                break;
              case HttpEventType.Response:
                this.spinnerService.hide();
                break;
            }
          }, () => {
            this.spinnerService.hide();
          })
        );
    } else {
      return next.handle(req);
    }

  }
}
