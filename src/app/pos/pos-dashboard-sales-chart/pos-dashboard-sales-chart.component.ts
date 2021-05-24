import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-pos-dashboard-sales-chart',
  templateUrl: './pos-dashboard-sales-chart.component.html',
  styleUrls: ['./pos-dashboard-sales-chart.component.css']
})
export class PosDashboardSalesChartComponent implements OnInit {
  colorScheme = 'cool';
  curve = shape.curveBasis;
  data = [
    {
      name: 'Sales',
      series: [
        { name: 'Jan', value: 100 },
        { name: 'Feb', value: 500 },
        { name: 'Mar', value: 10 },
        { name: 'Apr', value: 15 },
        { name: 'May', value: 1000 },
        { name: 'Jun', value: 1200 },
        { name: 'Jul', value: 900 },
        { name: 'Aug', value: 950 },
        { name: 'Sep', value: 0 },
        { name: 'Oct', value: 0 },
        { name: 'Nov', value: 0 },
        { name: 'Dec', value: 0 }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
