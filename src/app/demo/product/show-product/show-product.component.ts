import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { RegisterService } from 'src/app/services/product.service';
import { showNotification, awaitNotification } from 'src/app/interfaces/notification';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.scss'
})
export class ShowProductComponent {
  products: Product[] = [];
  constructor(private registerService: RegisterService) {}
  /* update = inject(RegisterService) */
  onDeleteProduct(producto: Product, id: number) {
    awaitNotification();
    console.log(producto, id);

    this.registerService.destroyProduct(producto).subscribe({
      next: (Response) => {
        console.log(Response);
        this.products.splice(id, 1);
        showNotification({
          title: 'Producto eliminado',
          icon: 'success',
          background: '#53A548',
          customClass: {
            title: 'text-white' // Cambia el color del texto a blanco
          }
        });
      },
      error: (error) => {
        showNotification({
          title: 'Error inesperado',
          icon: 'error',
          background: '#C5283D',
          customClass: {
            title: 'text-white' // Cambia el color del texto a blanco
          }
        });
      }
    });


  }


  ngOnInit() {
    this.registerService.getProduct().subscribe({
      next: (Response: any) => {
        this.products = Response.products;
        console.log(this.products);
      },
      error: (error) => {}
    });
  }
}
