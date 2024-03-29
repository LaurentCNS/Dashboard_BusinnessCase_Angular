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

  userForm = {username: '', password: ''};

  constructor(private authService : AuthService,
              private router : Router,
              ) { }

  ngOnInit(): void {
  }

connectUser(): void{
  this.authService.signIn(this.userForm)
  }

}
