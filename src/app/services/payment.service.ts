import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { ClientService } from './client.service';
import { Client } from '../interfaces/client';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private cartService = inject(CartService);
  private clientService = inject(ClientService);

  cliente: Client;
  cart: Product[] =[]
  constructor(private httpClient: HttpClient) {
    this.cartService.getProductOfcart().subscribe({
      next: (Response) => {
        this.cart = Response
      }
    });

    this.clientService.getClient().subscribe({
      next: (Response)=>{
        this.cliente = Response
      }
    })
  }

  proccesPayment():void{

    const payment = {cart: this.cart , client :this.cliente}
    this.httpClient.post('http://localhost:8000/api/pdf', payment, { responseType: 'blob' })
  .subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  });
    
  }


}
