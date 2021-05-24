import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos-dashboard',
  templateUrl: './pos-dashboard.component.html',
  styleUrls: ['./pos-dashboard.component.css']
})
export class PosDashboardComponent implements OnInit {
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor() { }

  ngOnInit(): void {
  }
}
