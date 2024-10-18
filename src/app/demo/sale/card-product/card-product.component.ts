import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { find } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { RegisterService } from 'src/app/services/product.service';


@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  products: Product[] = [];
  private registerService = inject(RegisterService);
  private cartService = inject(CartService)

  ngOnInit(): void {
    this.cartService.getProductOfcart().subscribe(r=>{
     /*  console.log(r) */
    })
    this.registerService.getProduct().subscribe({
      next: (Response: any) => {
        /* console.log(Response); */
        this.products = Response.products.map((product: Product) => ({
          ...product,
          cantidad: 0 // Inicializa cantidad en 0
        }));
      },

      error: (error) => {},
      complete: () => {}
    });
  }

  addProduct(product: Product){
    this.cartService.addProduct(product)
   
  }



  
}
