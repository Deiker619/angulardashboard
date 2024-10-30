import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/interfaces/client';
import { showNotification, awaitNotification, closeSwal } from 'src/app/interfaces/notification';
import { ClientService } from 'src/app/services/client.service';
import { CardProductComponent } from './card-product/card-product.component';
import { CardComponent } from '../../theme/shared/components/card/card.component';
import { FormRegisterClientComponent } from './form-register-client/form-register-client.component';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/interfaces/product';
import { CartSaleComponent } from './cart-sale/cart-sale.component';
import { PaymentComponent } from "./payment/payment.component";
import { SkeletonComponent } from "../skeleton/skeleton.component";

ReactiveFormsModule;
@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CartSaleComponent, CardProductComponent, CardComponent, FormRegisterClientComponent, PaymentComponent, SkeletonComponent],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  private clientService = inject(ClientService);
  private cartService = inject(CartService);

  isActiveInterface = false;
  totalSale: any;
  title: string = 'Sale Component';
  client: Client;
  setActiveSale() {
    this.isActiveInterface = !this.isActiveInterface;
  }
  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.cartService.getProductOfcart().subscribe((r: any) => {
      console.log(r);
    });
    this.cartService.getTotalSale().subscribe((r) => {
      this.totalSale = r;
    });
  }

  onRegisterClient() {
    awaitNotification();
    this.client = this.clientForm.value as Client;
    this.clientService.store(this.client).subscribe({
      next: (Response: any) => {
        closeSwal();
        console.log(Response);
        if (Response) {
          showNotification({
            icon: 'success',
            title: Response.message + ' ' + this.client.name,
            didClose: () => {
              this.setActiveSale();
            }
          });
        }
      },
      error: (error) => {
        closeSwal();
        showNotification({
          icon: 'error',
          title: 'Se produjo un error en el proceso',
          html: `<details>
                  <p>${error.error.message}</p>
                </details>`,
          timer: null,
          showCloseButton: true
        });
        console.log(error);
      }
    });
  }
}
