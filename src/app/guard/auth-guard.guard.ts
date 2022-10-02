import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private auth : AuthService,
              private router : Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // si l'utilisateur est connecté et a les valeurs d'admin, on retourne true
    if(this.auth.isLoggedIn !== true && this.auth.isAdmin() !== true){
      alert(`Vous n'avez pas l'autorisation!`)
      this.router.navigate(['/']);
    }
      return true;

  }

}
