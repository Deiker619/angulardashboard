import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardProductComponent } from './card-product/card-product.component';
import { FormRegisterClientComponent } from './form-register-client/form-register-client.component';
import { CartService } from 'src/app/services/cart.service';
import { CartSaleComponent } from './cart-sale/cart-sale.component';


@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    CommonModule,
    CartSaleComponent,
    CardProductComponent,
    FormRegisterClientComponent
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  private cartService = inject(CartService);

  isActiveInterface = false;
  totalSale: any;
  title: string = 'Sale Component';


  ngOnInit() {
    this.cartService.getProductOfcart().subscribe((r: any) => {
      console.log(r);
    });
    this.cartService.getTotalSale().subscribe((r) => {
      this.totalSale = r;
    });
    this.cartService.getActivateInterfazProducts().subscribe((r: boolean) => {
      this.isActiveInterface = r;
    });
  }
}
