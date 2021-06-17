import { Component } from '@angular/core';
import { DialogService } from '../../dialog/dialog.service';
import { Product } from '../../products/product.interface';
import { ProductService } from '../../products/product.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { ToastService } from '../../toast/toast.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-pos-checkout',
  templateUrl: './pos-checkout.component.html',
  styleUrls: ['./pos-checkout.component.css']
})
export class PosCheckoutComponent {
  searchTerm!: string;

  constructor(
    public cartService: CartService,
    public spinnerService: SpinnerService,
    private dialog: DialogService,
    private productService: ProductService,
    private toastService: ToastService
  ) { }

  search(): void {
    if (this.searchTerm && this.searchTerm.trim().length > 0) {
      this.productService.getProductByNameOrUpc(this.searchTerm)
        .subscribe(product => {
          if (product && product.id > 0) {
            this.cartService.addItem(product);
            this.searchTerm = null;
          }
          else {
            this.toastService.showError('Unable to find product. Please check if the barcode is correct.');
          }

        });
    }
  }

  scanBarcode(): void {
    this.dialog.scanBarcode$()
      .subscribe(result => {

        if (result) {
          const upc = result.trim();
          if (upc.length > 0) {

            this.searchTerm = upc;
            this.search();

          }
        }

      });
  }

  removeItem(product: Product): void {
    this.dialog.confirm$(`Remove ${product.name} from this cart?`)
      .subscribe(confirm => {
        if (confirm) {
          this.cartService.removeItem(product);
        }
      });
  }

}
