import { Injectable } from '@angular/core';
import { AuthClientConfig as Auth0ClientConfig, AuthService as Auth0Service } from '@auth0/auth0-angular';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  routerStateSnapshotUrl: string;

  constructor(
    private auth0: Auth0Service,
    private auth0Config: Auth0ClientConfig
  ) { }

  readonly user$ = this.auth0.user$;

  readonly isAuthenticated$ = this.auth0.isAuthenticated$
    .pipe(
      tap(loggedIn => this.isLoggedIn = loggedIn)
    );

  login(): void {
    if (!this.isLoggedIn) {
      this.auth0.loginWithRedirect({
        appState: { target: this.routerStateSnapshotUrl }
      });
    }    
  }

  logout(): void {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;

      this.auth0.logout({ returnTo: this.auth0Config.get().redirectUri });
    }
  }
  
}

