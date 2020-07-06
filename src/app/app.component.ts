import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './authorization/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isLoggedIn = false;
  public loggedUserEmail: string;
  private loggedUserRoles: string[];
  public loggedUserType: string;
  private loggedInSubcription: Subscription;
  roles = [];
  private roleSubcription: Subscription;

  constructor(
    private authorizationService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      router.events.subscribe((params: Params) => {
        this.ngOnInit();
      })
     }

  ngOnInit() {
    this.standardLogin();
  }

  standardLogin() {
    this.isLoggedIn = this.authorizationService.isLoggedIn();
    this.loggedInSubcription = this.authorizationService.loggedInStatusChanged.subscribe(
      (status: boolean) => {
        this.isLoggedIn = status;
        this.setUserForEditProfile();
      }
    );
    this.setUserForEditProfile();

    this.roles = this.authorizationService.getCurrentRoles();
    this.roleSubcription = this.authorizationService.roleChanged.subscribe(
      (roles: []) => {
        this.roles = roles;
      }
    );
  }

  setUserForEditProfile() {
    this.loggedUserEmail = this.authorizationService.getCurrentUser();
    this.loggedUserRoles = this.authorizationService.getCurrentRoles();
    this.loggedUserRoles.forEach(role => {
      if (role === 'ROLE_USER') {
        this.loggedUserType = 'user';
      }
    });
  }

  onLogout() {
    this.authorizationService.logout();
  }

  ngOnDestroy() {
    this.loggedInSubcription.unsubscribe();
    this.roleSubcription.unsubscribe();
  }

}
