import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PagedQuery } from '../../models/paged-query.interface';
import { PagedResult } from '../../models/paged-result.interface';
import { Invoice } from '../invoice.interface';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  pagedQuery: PagedQuery = {
    searchTerm: '',
    pageInfo: {
      page: 1,
      pageSize: 30
    }
  }

  pagedResult!: PagedResult<Invoice>;

  private searchTerms = new Subject<string>();

  constructor(private invoiceService: InvoiceService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    this.getInvoices();

    this.searchTerms
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => {
          this.pagedQuery.searchTerm = term;
          return this.invoiceService.getInvoices(this.pagedQuery);
        }),
      )
      .subscribe(result => this.pagedResult = result);
  }

  getInvoices(): void {
    this.invoiceService.getInvoices(this.pagedQuery)
      .subscribe(result => this.pagedResult = result);
  }

}
