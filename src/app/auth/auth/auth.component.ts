import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [routerAnimation]
})
export class AuthComponent {
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
