import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  store(client: Client){
    return this.httpClient.post('http://127.0.0.1:8000/api/client_store', client)
  }
}
