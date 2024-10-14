import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/interfaces/client';
import { showNotification, awaitNotification, closeSwal } from 'src/app/interfaces/notification';
import { ClientService } from 'src/app/services/client.service';
import { CardProductComponent } from './card-product/card-product.component';
import { CardComponent } from '../../theme/shared/components/card/card.component';
import { FormRegisterClientComponent } from './form-register-client/form-register-client.component';

ReactiveFormsModule;
@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardProductComponent, CardComponent, FormRegisterClientComponent],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  private clientService = inject(ClientService);
  isActiveInterface = true;
  title: string = 'Sale Component';
  client: Client;
  setActiveSale() {
    this.isActiveInterface = !this.isActiveInterface;
  }
  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required])
  });

  onRegisterClient() {
    awaitNotification();
    this.client = this.clientForm.value as Client;
    this.clientService.store(this.client).subscribe({
      next: (Response: any) => {
        closeSwal();
        console.log(Response);
        if (Response) {
          showNotification({
            icon: 'success',
            title: Response.message + ' ' + this.client.name,
            didClose: () => {
              this.setActiveSale();
            }
          });
        }
      },
      error: (error) => {
        closeSwal();
        showNotification({
          icon: 'error',
          title: 'Se produjo un error en el proceso',
          html: `<details>
                  <p>${error.error.message}</p>
                </details>`,
          timer: null,
          showCloseButton: true
        });
        console.log(error);
      }
    });
  }
}
