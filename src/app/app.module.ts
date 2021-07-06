import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule as Auth0Module, AuthClientConfig as Auth0ClientConfig, AuthConfig } from '@auth0/auth0-angular';
import { NgbModalModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeScannerDialogComponent } from './dialog/barcode-scanner-dialog.component';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog.component';
import { HttpErrorHandler } from './http-error-handler/http-error-handler.service';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { DataLoadingInterceptor } from './http-interceptors/data-loading-interceptor';
import { JsonContentTypeInterceptor } from './http-interceptors/json-content-type-interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PosModule } from './pos/pos.module';
import { ProductsModule } from './products/products.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToastsContainerComponent } from './toast/toasts-container.component';
import { AuthModule } from './auth/auth.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ToastsContainerComponent,
    SpinnerComponent,
    ConfirmationDialogComponent,
    BarcodeScannerDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    Auth0Module.forRoot({
      ...environment.auth0
    }),
    ZXingScannerModule,
    NgbToastModule,
    NgbModalModule,
    PosModule,
    ProductsModule,
    AuthModule,
    InvoicesModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JsonContentTypeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DataLoadingInterceptor, multi: true },
    HttpErrorHandler,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    locationStrategy: LocationStrategy,
    config: Auth0ClientConfig
  ) {
    const baseHref = locationStrategy.getBaseHref();
    let redirectUri = window.location.origin;
    if (baseHref && baseHref !== '/') redirectUri = `${redirectUri}${baseHref}`;

    const auth0Config: AuthConfig = {
      ...environment.auth0,
      redirectUri: redirectUri
    };

    config.set(auth0Config);
  }
}
