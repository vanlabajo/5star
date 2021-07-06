import { of } from 'rxjs';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;

  describe('isAuthenticated$', () => {
    it('should return true for a logged in user', () => {

      const authServiceMock: any = {
        isAuthenticated$: of(true),
        loginWithRedirect: jasmine.createSpy('loginWithRedirect'),
        logout: jasmine.createSpy('logout')
      };
      const authConfigMock: any = {
        get() {
          return ({ redirectUri: 'http://test.com' })
        }
      };

      service = new AuthService(authServiceMock, authConfigMock);
      const listener = jasmine.createSpy();
      service.isAuthenticated$.subscribe(listener);
      expect(authServiceMock.loginWithRedirect).not.toHaveBeenCalled();
      expect(authServiceMock.logout).not.toHaveBeenCalled();
      expect(listener).toHaveBeenCalledWith(true);
    });

    it('should return false for a logged out user', () => {

      const authServiceMock: any = {
        isAuthenticated$: of(false),
        loginWithRedirect: jasmine.createSpy('loginWithRedirect'),
        logout: jasmine.createSpy('logout')
      };
      const authConfigMock: any = {
        get() {
          return ({ redirectUri: 'http://test.com' })
        }
      };

      service = new AuthService(authServiceMock, authConfigMock);
      const listener = jasmine.createSpy();
      service.isAuthenticated$.subscribe(listener);
      expect(authServiceMock.loginWithRedirect).not.toHaveBeenCalled();
      expect(authServiceMock.logout).not.toHaveBeenCalled();
      expect(listener).toHaveBeenCalledWith(false);
    });

  });

  describe('login', () => {
    it('should not call loginWithRedirect for a logged in user', () => {

      const authServiceMock: any = {
        isAuthenticated$: of(true),
        loginWithRedirect: jasmine.createSpy('loginWithRedirect'),
        logout: jasmine.createSpy('logout')
      };
      const authConfigMock: any = {
        get() {
          return ({ redirectUri: 'http://test.com' })
        }
      };

      service = new AuthService(authServiceMock, authConfigMock);
      service.isAuthenticated$.subscribe();
      service.login();
      expect(authServiceMock.logout).not.toHaveBeenCalled();
      expect(authServiceMock.loginWithRedirect).not.toHaveBeenCalled();
    });

    it('should call loginWithRedirect for a logged out user', () => {

      const authServiceMock: any = {
        isAuthenticated$: of(false),
        loginWithRedirect: jasmine.createSpy('loginWithRedirect'),
        logout: jasmine.createSpy('logout')
      };
      const authConfigMock: any = {
        get() {
          return ({ redirectUri: 'http://test.com' })
        }
      };

      service = new AuthService(authServiceMock, authConfigMock);

      service.isAuthenticated$.subscribe();
      service.routerStateSnapshotUrl = '/test';
      service.login();
      expect(authServiceMock.logout).not.toHaveBeenCalled();
      expect(authServiceMock.loginWithRedirect).toHaveBeenCalledWith({
        appState: { target: '/test' },
      });
    });
  });

  describe('logout', () => {
    it('should not call logout for a logged out user', () => {

      const authServiceMock: any = {
        isAuthenticated$: of(false),
        loginWithRedirect: jasmine.createSpy('loginWithRedirect'),
        logout: jasmine.createSpy('logout')
      };
      const authConfigMock: any = {
        get() {
          return ({ redirectUri: 'http://test.com' })
        }
      };

      service = new AuthService(authServiceMock, authConfigMock);
      service.isAuthenticated$.subscribe();
      service.logout();
      expect(authServiceMock.logout).not.toHaveBeenCalled();
      expect(authServiceMock.loginWithRedirect).not.toHaveBeenCalled();
    });

    it('should call logout for a logged in user', () => {

      const authServiceMock: any = {
        isAuthenticated$: of(true),
        loginWithRedirect: jasmine.createSpy('loginWithRedirect'),
        logout: jasmine.createSpy('logout')
      };
      const authConfigMock: any = {
        get() {
          return ({ redirectUri: 'http://test.com' })
        }
      };

      service = new AuthService(authServiceMock, authConfigMock);
      service.isAuthenticated$.subscribe();
      service.logout();
      expect(authServiceMock.loginWithRedirect).not.toHaveBeenCalledWith();
      expect(authServiceMock.logout).toHaveBeenCalledWith({
        returnTo: 'http://test.com'
      });
    });
  });

});
