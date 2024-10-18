import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([])
  private priceTotal = new BehaviorSubject<number>(0) 
  total = 0;
  products: Product[] = [];
  cantidad: number = 1;
  constructor() { }

  addProduct(Product: Product) {
    const findProduct = this.products.find((i) => i.id === Product.id);
    if (findProduct) {
      findProduct.cantidad += this.cantidad;
    } else {
      Product.cantidad++
      this.products.push(Product); //Ingresa el producto al carro
      
      
    }
    this.cart.next(this.products)
    this.calculateTotal(Product.price)
  }

  calculateTotal(number:number|string){
    this.total += Number(number) 
    console.log(this.total)
    this.priceTotal.next(this.total)
  }

  getTotalSale(){
    return this.priceTotal.asObservable()
  }
  getProductOfcart(){
    return this.cart.asObservable()
  }
}
