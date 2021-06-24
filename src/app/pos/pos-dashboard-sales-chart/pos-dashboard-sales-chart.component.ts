import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { ExpensesService } from '../expenses.service';
import { SalesService } from '../sales.service';

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
        { name: 'Jan', value: 0 },
        { name: 'Feb', value: 0 },
        { name: 'Mar', value: 0 },
        { name: 'Apr', value: 0 },
        { name: 'May', value: 0 },
        { name: 'Jun', value: 0 },
        { name: 'Jul', value: 0 },
        { name: 'Aug', value: 0 },
        { name: 'Sep', value: 0 },
        { name: 'Oct', value: 0 },
        { name: 'Nov', value: 0 },
        { name: 'Dec', value: 0 }
      ]
    }
  ];
  totalRevenue: number = 0;
  totalCost: number = 0;

  get totalProfit(): number {
    return this.totalRevenue - this.totalCost;
  }

  constructor(
    private salesService: SalesService,
    private expensesService: ExpensesService
  ) { }

  ngOnInit(): void {
    this.getMonthlySales();
    this.getMonthlyExpenses();
  }

  getMonthlySales(): void {
    const today = new Date();
    this.salesService.getMonthlySales(today.getFullYear())
      .subscribe(sales => {
        if (sales) {
          const entries = Object.entries(sales);

          if (entries.length > 0) {

            const newSeries = entries.map(sales => ({ name: sales[0][0].toUpperCase() + sales[0].slice(1), value: sales[1] })).filter(series => series.name !== 'Year');

            const newData = [{
              name: 'Sales',
              series: newSeries
            }];
            this.data = [...newData];

            this.totalRevenue = newSeries.reduce((a, b) => a + b.value, 0);
          }

        }
      });
  }

  getMonthlyExpenses(): void {
    const today = new Date();
    this.expensesService.getMonthlyExpenses(today.getFullYear())
      .subscribe(expenses => {
        if (expenses) {
          const entries = Object.entries(expenses);

          if (entries.length > 0) {

            const newSeries = entries.map(expenses => ({ name: expenses[0][0].toUpperCase() + expenses[0].slice(1), value: expenses[1] })).filter(series => series.name !== 'Year');

            this.totalCost = newSeries.reduce((a, b) => a + b.value, 0);
          }

        }
      });
  }

}
