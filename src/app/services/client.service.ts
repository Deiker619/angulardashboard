import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  Cliente = new BehaviorSubject<Client | null>(null);

  constructor(private httpClient: HttpClient) { }

  store(client: Client){
    return this.httpClient.post('http://127.0.0.1:8000/api/client_store', client)
  }

  getClient(){
    return this.Cliente.asObservable()
  }
}
