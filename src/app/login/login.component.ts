import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { User } from '../class/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm = new User();

  constructor(private authService : AuthService,
              private router : Router,
              private toastr : ToastrService) { }

  ngOnInit(): void {
  }

connectUser(): void{
  this.authService.signIn(this.userForm)
  this.toastr.success('Bonjour Mr Capard, content de vous revoir!')
   
}

}
