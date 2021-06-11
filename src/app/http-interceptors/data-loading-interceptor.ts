import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize } from "rxjs/operators";
import { SpinnerService } from "../spinner/spinner.service";

@Injectable()
export class DataLoadingInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.spinnerService.startRequestHandling(req);
    return next.handle(req).pipe(
      finalize(() => {
        return this.spinnerService.stopRequestHandling(req);
      })
    );
  }
}
