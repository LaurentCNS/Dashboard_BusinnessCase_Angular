import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './class/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.api;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient,
    private router: Router) { }


  signIn(user: User) {
    return this.httpClient
      .post<any>(this.apiUrl + `authentication_token`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['/dashboard'])
      });
  }


  getToken() {
    return localStorage.getItem('access_token');
  }


  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

 
}
