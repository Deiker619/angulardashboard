
import { CommonModule } from '@angular/common';
import { Component, inject,  OnDestroy  } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/interfaces/client';
import { showNotification, awaitNotification, closeSwal } from 'src/app/interfaces/notification';
import { CartService } from 'src/app/services/cart.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-form-register-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-register-client.component.html',
  styleUrl: './form-register-client.component.scss'
})
export class FormRegisterClientComponent implements OnDestroy {
  title = 'Form-register'
  private cartService = inject(CartService);
  private clientService = inject(ClientService);
  client: Client;
 
  /* 
    //Formulario para un nuevo cliente o tomar uno ya creado para la compra
  */
  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required])
  });
  

  onRegisterClient() { //Metodo para crear o registrar un nuevo cliente
    awaitNotification() //Muestra notificacion de esperar para
    this.client = this.clientForm.value as Client; //Asigna el formulario ClientForm 
    this.clientService.store(this.client).subscribe({ //Se suscribe al servicio de client 'Store'
      next: (Response:any)=>{
        this.clientService.Cliente.next(Response.client); //Emite los datos del cliente a sus subscriptores
        this.cartService.dateOfCart.next(Response.cart); //Emite los datos del carrito a sus subscriptores
        closeSwal() //Cierra el modal de espera
        if(Response){
          showNotification({
            icon: 'success',
            title: Response.message + " " + this.client.name,
            didClose: () => {//Cuando se cierre la notificacion
              //
              this.cartService.activateInterfazProducts.next(true) //Emite un true para aperturar la interfaz con los productos
            }

          })
          
        }
      },
      
      error: (error)=>{ //En caso de error
        closeSwal()
        showNotification({
          icon: 'error',
          title: 'Se produjo un error en el proceso',
          html: `<details>
                  <p>${error.error.message}</p>
                </details>`,
          timer: null,
          showCloseButton:true
          

        })
        console.log(error)
      }
    })
    
  }

  ngOnDestroy():void{
    console.log('Destruyo el ' + this.title)
  }

  
}
