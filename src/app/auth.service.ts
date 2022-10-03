import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {User} from './class/user';
import {Produits} from "./class/stats";
import {UserModel} from "./class/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.api;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user !: UserModel;

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }


  signIn(user: User) {
    localStorage.removeItem('access_token');
    return this.httpClient
      .post<any>(this.apiUrl + `authentication_token`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['/dashboard'])
        this.user = this.getUser(res.token);
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

  get isAdmin(): boolean {
    let authToken = localStorage.getItem('access_token');
    if (authToken !== null) {
      this.user = this.getUser(authToken);
      // parcourir les roles
      for (let role of this.user.roles) {
        if (role === "ROLE_ADMIN") {
          return true;
        }
      }
    }
    return false;
  }

  getUser(token: string): UserModel {
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }

}
