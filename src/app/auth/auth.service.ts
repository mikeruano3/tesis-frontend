import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = `${environment.apiUrl}/api/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data:any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', data, httpOptions).pipe();
  }

  registerAppUser(data:any): Observable<any> {
    return this.http.post(AUTH_API + 'signup-app-user', data, httpOptions).pipe()
  }

  updateAppUser(id:string, data:any): Observable<any> {
    return this.http.put(AUTH_API + 'update-app-user/' + id, data, httpOptions).pipe()
  }

  sendResetPassword(data: { email:string }): Observable<any> {
    return this.http.post(AUTH_API + 'send-reset-password', data, httpOptions).pipe()
  }

  sendPasswordData(data: { password:string, token:string }): Observable<any> {
    return this.http.post(AUTH_API + 'reset-password-data', data, httpOptions).pipe()
  }
}