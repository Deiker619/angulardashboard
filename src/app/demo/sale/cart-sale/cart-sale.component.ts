import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-sale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sale.component.html',
  styleUrl: './cart-sale.component.scss'
})
export class CartSaleComponent {

  private CartService = inject(CartService)
  price?:number;
  Products: Product[] = []
  canvas: boolean = false;

  ngOnInit():void{

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
