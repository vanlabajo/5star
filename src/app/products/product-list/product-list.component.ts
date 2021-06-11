import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PagedQuery } from '../../models/paged-query.interface';
import { PagedResult } from '../../models/paged-result.interface';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pagedQuery: PagedQuery = {
    searchTerm: '',
    pageInfo: {
      page: 1,
      pageSize: 30
    }
  }

  pagedResult: PagedResult<Product> = {
    data: [],
    collectionSize: 0
  };

  private searchTerms = new Subject<string>();

  constructor(private productService: ProductService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    this.getProducts();

    this.searchTerms
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => {
          this.pagedQuery.searchTerm = term;
          return this.productService.getProducts(this.pagedQuery);
        }),
      )
      .subscribe(result => this.pagedResult = result);
  }

  getProducts(): void {
    this.productService.getProducts(this.pagedQuery)
      .subscribe(result => this.pagedResult = result);
  }

}
