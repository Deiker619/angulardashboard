import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { showNotification, awaitNotification } from 'src/app/interfaces/notification';
import { ClientService } from 'src/app/services/client.service';

ReactiveFormsModule;
@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  private clientService = inject(ClientService);
  isActiveInterface = false;
  title: string = 'Sale Component';
  client: Client;

  setActive() {
    this.isActiveInterface = !this.isActiveInterface;
  }
  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required])
  });

  onRegisterClient() {
    awaitNotification()
    this.client = this.clientForm.value as Client;
    this.clientService.store(this.client).subscribe({
      next: (Response)=>{
        if(Response){
          showNotification({
            icon: 'success',
            title: "Registro exitoso de " + this.client.name,
            didClose: () => {
              this.setActive()
            }

          })
          
        }
      },
      error: (error)=>{
        console.log(error)
      }
    })
    
  }
}
