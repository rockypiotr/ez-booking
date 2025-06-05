import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Client, ClientAddForm, ClientAddRequest } from '../../@shared/models/client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../pages/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  private apiUrl = environment.apiUrl
  private http: HttpClient = inject(HttpClient)
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService)

  addClient(clientAddRequest: ClientAddForm, businessId: string): Observable<Client>{
    return this.http.post<Client>(`${this.apiUrl}/client/add`, {...clientAddRequest, businessId})
  }

  createSimpleAddClientForm(): FormGroup{
    return this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })
  }
}
