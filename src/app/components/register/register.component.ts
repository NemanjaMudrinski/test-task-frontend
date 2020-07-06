import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authorization/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = {
    id: null,
    email: "",
    password: "",
    name: ""
  }

  userAccounts: Account[] = [];

  constructor(
      private authorizationService: AuthService,
      private accountService: AccountService,
      private userService: UserService,
      private router: Router,
      private toast: ToastrService,
    ) { }

  ngOnInit() {
   
  }

  save(){
    this.userService.save(this.user).subscribe(_ =>
      this.toast.success(
        this.user.email,
        'Successfully registerd',
        {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        }));
  this.router.navigate(['/login']);
  }

}
