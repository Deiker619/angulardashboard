import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
ReactiveFormsModule
@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {

  isActiveInterface = false;
  title: string = "Sale Component"
  client: Client

  setActive(){
    this.isActiveInterface = !this.isActiveInterface ;

  }
  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name : new FormControl('',[Validators.required]),
    cedula: new FormControl('', [Validators.required])
  })

  onRegisterClient(){
   this.client = this.clientForm.value as Client
    console.log(this.client)
    this.setActive()
  }
  
}
