import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    ProfileComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
