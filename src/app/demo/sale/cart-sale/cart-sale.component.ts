import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ClientService } from 'src/app/services/client.service';
import { PaymentComponent } from '../payment/payment.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-sale',
  standalone: true,
  imports: [CommonModule, PaymentComponent],
  templateUrl: './cart-sale.component.html',
  styleUrl: './cart-sale.component.scss'
})
export class CartSaleComponent implements OnDestroy{
 title = 'cart-sale'
  private a: Subscription;
  private CartService = inject(CartService)
  private ClientService = inject(ClientService)
  cliente: Client;
  price?:number;
  Products: Product[] = []
  canvas: boolean = false;

  ngOnInit():void{
    this.a = this.ClientService.getClient().subscribe((r)=>{
      this.cliente = r
      console.log(this.cliente)
      
    })
      this.CartService.getTotalSale().subscribe(r =>{
      this.price = r
    })
    this.CartService.getProductOfcart()
    .subscribe({
      next: (Response)=>{
        this.Products = Response
      },

    })
  }

  ngOnDestroy():void{
    console.log('Destruyo el ' + this.title)
  }
}
