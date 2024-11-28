import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { ClientService } from './client.service';
import { Client } from '../interfaces/client';
import { Product } from '../interfaces/product';
import { showNotification } from '../interfaces/notification';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private cartService = inject(CartService);
  private clientService = inject(ClientService);

  cliente: Client;
  cart: Product[] = [];
  datesOfcart: object = {};
  constructor(private httpClient: HttpClient) {
    this.cartService.getProductOfcart().subscribe({
      next: (Response) => {
        this.cart = Response;
      }
    });

    this.cartService.getDateOfCart().subscribe({
      next: (response) => {
        this.datesOfcart = response;
        console.log(this.datesOfcart);
      },
      error: (error) => {}
    });

    this.clientService.getClient().subscribe({
      next: (Response) => {
        this.cliente = Response;
      }
    });
  }

  facturingPayment(): void {
    const payment = { cart: this.cart, datesOfCart: this.datesOfcart, client: this.cliente };

    console.log(payment);
    this.httpClient.post('http://localhost:8000/api/pdf', payment, { responseType: 'blob' }).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }

  sendPayment(): void {
    const payment = { cart: this.cart, datesOfCart: this.datesOfcart, client: this.cliente };
    this.httpClient.post('http://localhost:8000/api/payment', payment).subscribe({
      next: (response)=>{
        
        showNotification({
          icon: 'success',
          html: `Muchas gracias por su compra <b>${this.cliente.name}</b>`,
          showCloseButton:true,
          didClose:()=>{
            this.cartService.activateInterfazProducts.next(false)
          }
        })
      },
      error:(err) =>{
        showNotification({
          icon: 'error',
          title: 'Se produjo un error en el proceso',
          timer: null,
          showCloseButton:true
        })
      },
      
    });
  }
}
