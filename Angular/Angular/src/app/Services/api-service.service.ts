import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'http://localhost:8000';  // Twoje URL API

  constructor(private http: HttpClient) {}

  getData() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Token ${token}` });

    return this.http.get<any>(`${this.apiUrl}/api-endpoint/`, { headers });
  }
}
