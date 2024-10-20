import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-cart-sale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sale.component.html',
  styleUrl: './cart-sale.component.scss'
})
export class CartSaleComponent {

  private CartService = inject(CartService)
  private ClientService = inject(ClientService)
  cliente: Client  ;
  price?:number;
  Products: Product[] = []
  canvas: boolean = false;

  ngOnInit():void{
    this.ClientService.getClient().subscribe((r)=>{
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
}
