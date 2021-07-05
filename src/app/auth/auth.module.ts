import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    ProfileComponent,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class AuthModule { }
