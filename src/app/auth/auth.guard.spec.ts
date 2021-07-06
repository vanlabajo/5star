import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  const routeMock: any = { snapshot: {} };
  const routeStateMock: any = { snapshot: {}, url: '/' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  describe('canActivate', () => {
    it('should return true for a logged in user', () => {
      const authServiceMock: any = {
        isAuthenticated$: of(true),
        login: jasmine.createSpy('login'),
      };      
      guard = new AuthGuard(authServiceMock, router);
      const listener = jasmine.createSpy();
      guard.canActivate(routeMock, routeStateMock).subscribe(listener);
      expect(authServiceMock.login).not.toHaveBeenCalled();
      expect(listener).toHaveBeenCalledWith(true);
    });

    it('should redirect a logged out user', () => {
      const authServiceMock: any = {
        isAuthenticated$: of(false),
        login: jasmine.createSpy('login'),
      };
      const routerSpy = spyOn(router, 'parseUrl');
      guard = new AuthGuard(authServiceMock, router);
      guard.canActivate(routeMock, routeStateMock).subscribe();
      expect(authServiceMock.login).not.toHaveBeenCalled();
      expect(routerSpy.calls.first().args[0]).toContain('/auth/login');
    });
  });

  describe('canActivateChild', () => {
    it('should return true for a logged in user', () => {
      const authServiceMock: any = {
        isAuthenticated$: of(true),
        login: jasmine.createSpy('login'),
      };
      guard = new AuthGuard(authServiceMock, router);
      const listener = jasmine.createSpy();
      guard.canActivateChild(routeMock, routeStateMock).subscribe(listener);
      expect(authServiceMock.login).not.toHaveBeenCalled();
      expect(listener).toHaveBeenCalledWith(true);
    });

    it('should redirect a logged out user', () => {
      const authServiceMock: any = {
        isAuthenticated$: of(false),
        login: jasmine.createSpy('login'),
      };
      const routerSpy = spyOn(router, 'parseUrl');
      guard = new AuthGuard(authServiceMock, router);
      guard.canActivate(routeMock, routeStateMock).subscribe();
      expect(authServiceMock.login).not.toHaveBeenCalled();
      expect(routerSpy.calls.first().args[0]).toContain('/auth/login');
    });
  });

});
