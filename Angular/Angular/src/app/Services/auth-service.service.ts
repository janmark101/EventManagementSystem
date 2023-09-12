import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://127.0.0.1:8000/LoginSystem';  

  constructor(private http: HttpClient) {}


  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/Login/`, { email, password });
  }

  register(user:any){
    return this.http.post<any>(`${this.apiUrl}/UsersList`, user);
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`  // Dodaj token do nagłówka
    });

    return this.http.post(`${this.apiUrl}/Logout/`, {}, { headers });
  }


}
