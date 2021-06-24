import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../invoice.interface';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  invoice!: Invoice;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
  ) { }

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (id && id > 0) {
      this.invoiceService.getInvoice(id)
        .subscribe(invoice => this.invoice = invoice);
    }
    else {
      this.goToInvoices();
    }
  }

  goToInvoices(): void {
    this.router.navigateByUrl('/invoices');
  }

}
