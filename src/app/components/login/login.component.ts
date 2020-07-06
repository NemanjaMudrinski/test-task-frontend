import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authorization/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authorizationService: AuthService) { }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authorizationService.login(form.value.email, form.value.password);
  
  }
}
