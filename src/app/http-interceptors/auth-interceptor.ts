import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { switchMap } from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth0: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.auth0.getAccessTokenSilently()
      .pipe(
        switchMap(token => {
          // Clone the request and replace the original headers with
          // cloned headers, updated with the authorization.
          const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

          // send cloned request with header to the next handler.
          return next.handle(authReq);
        })
    );

  }
}
