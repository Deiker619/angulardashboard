import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { CartService } from 'src/app/services/cart.service';
import { ClientService } from 'src/app/services/client.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  cartService = inject(CartService)
  clientService = inject(ClientService)
  paymentService = inject(PaymentService)
  cliente: Client
  totalSale: number = 0;
  togglePayment = false;
  animation: boolean = false;
  methodPaymentToggle: boolean = false

  ngOnInit(){
    this.clientService.getClient().subscribe(
      Response => {
      this.cliente = Response
      /* console.log(this.cliente) */
    })
    
    this.cartService.getTotalSale().subscribe((response)=>this.totalSale = response)
  }
  addClassWithDelay() {
    this.togglePayment = !this.togglePayment;
    const delay = 200; // 2 segundos

      // Después del tiempo de espera, se cambia la variable a true
      setTimeout(() => {
        this.animation = !this.animation;
        /* console.log('cargando animacin'); */
      }, delay);
    
  }

  closeOrOpenPaymentMethod(){
    this.methodPaymentToggle = !this.methodPaymentToggle
  }

  proccesPayment():void{
    this.paymentService.sendPayment()
  }
}
