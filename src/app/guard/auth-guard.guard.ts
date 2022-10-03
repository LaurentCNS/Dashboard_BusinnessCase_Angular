import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import {StatsService} from "../stats.service";
import {UserModel} from "../class/user.model";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'

})
export class AuthGuardGuard implements CanActivate {

  user !: UserModel;

  constructor(private auth : AuthService,
              private router : Router,
              private stats: StatsService,
              private toastr : ToastrService
              ){

  }

  canActivate(



    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // si l'utilisateur est connecté
    if(this.auth.isAdmin !== true){
      this.toastr.error("Vous n'avez pas les droits d'accès à cette page", "Accès refusé");
      this.router.navigate(['/']);
    }
      return true;
  }

}
