import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild  {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkLogin(state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkLogin(state);
  }

  private checkLogin(state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$
      .pipe(
        map(loggedIn => {
          if (!loggedIn) {
            this.authService.routerStateSnapshotUrl = state.url;
            return this.router.parseUrl('/auth/login');
          }

          return true;
        })
      );
  }

}
