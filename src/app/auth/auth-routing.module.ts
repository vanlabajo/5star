import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'login',
            component: LoginComponent,
            data: { animation: 'authLogin' }
          },
          {
            path: 'profile',
            component: ProfileComponent,
            canActivate: [AuthGuard],
            data: { animation: 'authProfile' }
          }          
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
