import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'profile', component: ProfileComponent, data: { animation: 'authProfile' } }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
