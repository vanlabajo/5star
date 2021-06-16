import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../dialog/dialog.service';
import { Product } from '../../products/product.interface';
import { ProductService } from '../../products/product.service';
import { SpinnerService } from '../../spinner/spinner.service';

@Component({
  selector: 'app-pos-price-check',
  templateUrl: './pos-price-check.component.html',
  styleUrls: ['./pos-price-check.component.css']
})
export class PosPriceCheckComponent implements OnInit {
  product!: Product;

  constructor(
    private router: Router,
    private dialog: DialogService,
    private productService: ProductService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.dialog.scanBarcode$()
      .subscribe(upc => {
        if (upc && upc.trim() && upc.length > 0) {
          this.productService.getProductByNameOrUpc(upc)
            .subscribe(product => this.product = product);
        }
        else {
          this.product = {} as Product;
        }
      });
  }

  search(term: string): void {
    if (term) {
      this.productService.getProductByNameOrUpc(term)
        .subscribe(product => this.product = product);
    }    
  }
}
