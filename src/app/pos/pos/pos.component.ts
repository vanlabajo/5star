import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
  animations: [routerAnimation]
})
export class PosComponent {
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
