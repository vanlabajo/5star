import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
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
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...environment.auth0
    }),
    ZXingScannerModule,
    NgbToastModule,
    NgbModalModule,
    PosModule,
    ProductsModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JsonContentTypeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DataLoadingInterceptor, multi: true },
    HttpErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
