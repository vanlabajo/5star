import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class JsonContentTypeInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const jsonReq = req.clone({ setHeaders: { 'Content-Type': 'application/json' } });

    // send cloned request with header to the next handler.
    return next.handle(jsonReq);

  }
}
