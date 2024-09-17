import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { RegisterService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  constructor(
    private route: ActivatedRoute,
    private registerService: RegisterService
  ) {}


  index: number = 0;

  ngOnInit() {
    this.index = this.route.snapshot.params['id']; //Toma el parametro de la ruta en caso de haberlo
    if (this.index) {
      console.log(this.index);
      this.registerService.getOnlyProduct(this.index)
      .subscribe({
        next:(Response=>{
          console.log(Response)
        }), 
        error: (error =>{
          console.log(error)
        })
      })
    }
  }


  procesarProduct(producto: Product){
    
  }
}
