import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-pos-dashboard-sales-figure',
  templateUrl: './pos-dashboard-sales-figure.component.html',
  styleUrls: ['./pos-dashboard-sales-figure.component.css']
})
export class PosDashboardSalesFigureComponent implements OnInit {
  thisMonthSales: number = 0;
  todaySales: number = 0;

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.getMonthlySales();
    this.getTodaySales();
  }

  getMonthlySales(): void {
    const today = new Date();
    this.salesService.getMonthlySales(today.getFullYear())
      .subscribe(sales => {
        if (sales) {
          const entries = Object.entries(sales);

          if (entries.length > 0) {

            const newSeries = entries.map(sales => ({ name: sales[0][0].toUpperCase() + sales[0].slice(1), value: sales[1] })).filter(series => series.name !== 'Year');

            const thisMonth = newSeries.find(series => series.name === today.toLocaleString('default', { month: 'short' }));

            if (thisMonth) {
              this.thisMonthSales = thisMonth.value;
            }
          }

        }
      });
  }

  getTodaySales(): void {
    this.salesService.getTodaySales()
      .subscribe(sales => this.todaySales = sales);
  }

}
