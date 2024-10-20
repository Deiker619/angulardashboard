import { Component, inject, OnInit, AfterViewInit  } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { find } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { CommonModule } from '@angular/common';
import { RegisterService } from 'src/app/services/product.service';


@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  products: Product[] = [];
  private registerService = inject(RegisterService);
  private cartService = inject(CartService)


  ngOnInit(): void {
    this.cartService.getProductOfcart().subscribe(r=>{
      console.log(r)
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
  ngAfterViewInit(): void {
    console.log('La vista del componente ha sido inicializada.');
  }

  addProduct(product: Product){
    this.cartService.addProduct(product)
   
  }
  removeProduct(product: Product){
    this.cartService.removeProduct(product)
   
  }



  
}
