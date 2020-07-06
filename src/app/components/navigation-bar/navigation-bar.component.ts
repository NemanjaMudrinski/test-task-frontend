import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/authorization/auth.service';
import { Farm } from 'src/app/models/farm';
import { FarmService } from 'src/app/services/farm.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import decode from 'jwt-decode';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
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
