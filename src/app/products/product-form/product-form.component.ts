import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../../dialog/dialog.service';
import { ServiceResult } from '../../models/service-result.interface';
import { ToastService } from '../../toast/toast.service';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product!: Product;
  serviceResult: ServiceResult = {
    success: false,
    validationErrors: undefined
  };
  submitted: boolean = false;
  openScanner: boolean = false;
  @ViewChild('productForm') private productForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toast: ToastService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (id && id > 0) {
      this.productService.getProduct(id)
        .subscribe(product => this.product = product);
    }
    else {
      this.product = {
        id: 0,
        name: '',
        upc: '',
        cost: 0,
        price: 0,
        quantity: 0,
        auditLog: null
      };
    }
  }

  goToProducts(): void {
    this.router.navigateByUrl('/products');
  }

  save(): void {
    if (this.product) {
      this.submitted = true;
      let addOrUpdate: Observable<ServiceResult>;

      if (this.product.id > 0) {
        addOrUpdate = this.productService.updateProduct(this.product);
      }
      else {
        addOrUpdate = this.productService.addProduct(this.product);
      }

      addOrUpdate.subscribe(result => {
        this.serviceResult = result;

        if (result.success) {
          this.toast.show("Successfully saved product.");          
          this.goToProducts();
        }
        else {
          if (result.validationErrors) {
            const message = result.validationErrors.hasOwnProperty('product')
              ? `Error in saving product. ${result.validationErrors.product}`
              : 'Error in saving product. Please check for validation errors and try again.';

            this.toast.showError(message);
          }
        }

        this.submitted = false;
      });
    }
  }

  delete(): void {
    this.dialog.confirm$('Are you sure to delete this product?')
      .subscribe(confirm => {
        if (confirm) {

          this.submitted = true;

          this.productService.deleteProduct(this.product.id)
            .subscribe(result => {
              this.serviceResult = result;

              if (result.success) {
                this.toast.show("Successfully removed product.");                
                this.goToProducts();
              }
              else {
                if (result.validationErrors) {
                  const message = result.validationErrors.hasOwnProperty('product')
                    ? `Error in removing product. ${result.validationErrors.product}`
                    : 'Error in removing product. The data might be used in other places.';

                  this.toast.showError(message);
                }
              }

              this.submitted = false;
            });

        }
      });
  }

  canDeactivate(): Observable<boolean> | boolean {

    if (!this.product || !this.productForm.dirty || this.serviceResult.success) {
      return true;
    }

    return this.dialog.confirm$('Discard changes?');
  }

  scanBarcode(): void {
    this.openScanner = true;
  }

  onScanSuccess(scanResult: string): void {
    if (scanResult) {
      this.product.upc = scanResult.trim();
      this.openScanner = false;
    }
  }

  onClick(): void {
    this.openScanner = false;
  }
}
