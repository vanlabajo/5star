import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { tap } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  routerStateSnapshotUrl: string;

  constructor(
    private auth0: Auth0Service,
    private locationStrategy: LocationStrategy,
  ) { }

  isAuthenticated$(): Observable<boolean> {
    return this.auth0.isAuthenticated$
      .pipe(
        tap(loggedIn => this.isLoggedIn = loggedIn)
      );
  }

  login(): void {
    if (!this.isLoggedIn) {
      const baseHref = this.locationStrategy.getBaseHref();
      let redirectUri = window.location.origin;
      if (baseHref && baseHref !== '/') redirectUri = `${redirectUri}/${baseHref}`;

      this.auth0.loginWithRedirect({
        redirect_uri: redirectUri,
        appState: { target: this.routerStateSnapshotUrl }
      });
    }    
  }

  logout(): void {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;

      const baseHref = this.locationStrategy.getBaseHref();
      let redirectUri = window.location.origin;
      if (baseHref) redirectUri = `${redirectUri}/${baseHref}`;

      this.auth0.logout({ returnTo: redirectUri });
    }
  }
}

