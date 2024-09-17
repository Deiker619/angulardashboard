import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  registerProduct(product: Product){
    console.log(product)
    return this.httpClient.post('http://127.0.0.1:8000/api/product_store', product)
  }

  getProduct(){
   return this.httpClient.get('http://127.0.0.1:8000/api/product_get')
  }
  getOnlyProduct(product: number){
   return this.httpClient.get('http://127.0.0.1:8000/api/product_get/'+ product)
  }

  updateproduct(product: Product, index:number){
    console.log(index)
    return this.httpClient.put('http://127.0.0.1:8000/api/product_update/'+index, product)
  }
  
  destroyProduct(product: Product){
    return this.httpClient.delete('http://127.0.0.1:8000/api/product_destroy/' + product)
  }
  
}


