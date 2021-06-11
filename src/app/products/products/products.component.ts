import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { routerAnimation } from '../../animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [routerAnimation]
})
export class ProductsComponent {

  constructor(paginationConfig: NgbPaginationConfig) {
    paginationConfig.pageSize = 30;
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
