import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Product } from 'src/app/interfaces/product';
import { RegisterService } from 'src/app/services/product.service';
import { SweetAlert2Module, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { showNotification, awaitNotification } from 'src/app/interfaces/notification';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, CommonModule, SweetAlert2Module],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private registerService: RegisterService,  private route: ActivatedRoute,) {}

  product?: Product;
  seending: boolean;
  message: string = '';
  index: number = 0;

  registerProduct = new FormGroup({
    nameProduct: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  ngOnInit() {
     this.index = this.route.snapshot.params['id']; //Toma el parametro de la ruta en caso de haberlo /* MODO EDICION DE PRODUCTO */
    if (this.index) {
      console.log(this.index);
      this.registerService.getOnlyProduct(this.index)
      .subscribe({
        next:((Response:any)=>{
          console.log(Response)
          this.procesarProduct(Response)
          
        }), 
        error: (error =>{
          console.log(error)
        })
      })
    }
  }

  onRegisterProduct() {
    awaitNotification();
    this.product = this.registerProduct.value as Product;
    if(this.index){
      this.registerService.updateproduct(this.product, this.index)
      .subscribe({
        next: (Response=>{
          console.log(Response)
          showNotification({
            title: '',
            icon: 'success',
            background: '#53A548',
            customClass: {
              title: 'text-white' // Cambia el color del texto a blanco
            }
          });
        }),
        error:(error=>{
          console.log(error)
        })
      })
    }else{

      this.registerService.registerProduct(this.product).subscribe({
        next: (response:any) => {
          this.message = 'Registrado exitosamente';
          console.log(response)
          showNotification({
            title: this.message +" "+ response.producto.nameProduct,
            icon: 'success',
            background: '#53A548',
            customClass: {
              title: 'text-white' // Cambia el color del texto a blanco
            }
          });
        },
        error: (error) => {
          this.message = 'Ocurrió un error inesperado';
          showNotification({
            title: this.message,
            icon: 'error',
            background: '#C5283D',
            customClass: {
              title: 'text-white' // Cambia el color del texto a blanco
            }
          });
        }
      });
    }

  }

  procesarProduct(producto: Product){
    this.registerProduct.get('nameProduct')?.setValue(producto.nameProduct)
    this.registerProduct.get('price')?.setValue(producto.price)
    this.registerProduct.get('category')?.setValue(producto.category)
    this.registerProduct.get('description')?.setValue(producto.description)
  }

}
