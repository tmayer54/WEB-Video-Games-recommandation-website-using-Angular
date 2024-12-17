import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(registerForm: any, image: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      registerForm,
      image
    }, httpOptions);
  }

  verifyUsername(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'userexist', {
      username
    }, httpOptions);
  }

  getEmail(ID: number): Observable<any> {
    return this.http.post(AUTH_API + 'getemail', {
      ID
    }, httpOptions);
  }

  verifyUserPassword(ID: number, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'passwordcorrect', {
      ID,
      password
    }, httpOptions);
  }

  updateUser(registerForm: any, ID: number, image: string): Observable<any> {
    return this.http.post(AUTH_API + 'update', {
      registerForm,
      ID,
      image
    }, httpOptions);
  }
}
