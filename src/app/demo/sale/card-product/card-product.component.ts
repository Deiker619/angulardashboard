import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { find } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { RegisterService } from 'src/app/services/product.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  cartProducts: Product[] = [];
  products: Product[] = [];
  cantidad: number = 1;

  private registerService = inject(RegisterService);

  ngOnInit(): void {
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

  addProduct(Product: Product) {
    const findProduct = this.cartProducts.find((i) => i.id === Product.id);
    if (findProduct) {
      findProduct.cantidad += this.cantidad;
    } else {
      Product.cantidad++
      this.cartProducts.push(Product); //Ingresa el producto al carro
    }
    console.log(this.cartProducts);
  }
}
