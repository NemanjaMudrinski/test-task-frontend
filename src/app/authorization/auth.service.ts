import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({ providedIn: "root" })
export class AuthService {

  roleChanged = new Subject<any[]>();
  loggedInStatusChanged = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private toast: ToastrService) {}

  login(email: string, password: string){
    this.http.post<{token: string}>("http://cyrillic-software.us-east-1.elasticbeanstalk.com/api/login", {email: email, password: password}).subscribe(response =>{
    // this.http.post<{token: string}>("http://localhost:5000/api/login", {email: email, password: password}).subscribe(response =>{
        if(response.token){
        localStorage.setItem('token', response.token);
        this.toast.success(
          email,
          'Successfully logged in',
          {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing'
          });
        this.roleChanged.next(this.getCurrentRoles());
        this.router.navigate(['/']);
        this.loggedInStatusChanged.next(true);
      }
    });
  }

  logout(){
    this.roleChanged.next([]);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.loggedInStatusChanged.next(false);
  }

  getCurrentRoles(){
    const token = localStorage.getItem('token');
    var roles = []
    if(token){
      decode(token).role.forEach(role => {
        roles.push(role.authority);
      });
    }
    return roles;
  }

  getCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      return decode(token).uniq;
    }
    return null;
  }

  getCurrentUserId(){
    const token = localStorage.getItem('token');
    if(token){
      return decode(token).sub;
    }
    return null;
  }

  isLoggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

}