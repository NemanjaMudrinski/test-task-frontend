import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/authorization/auth.service';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  email: string;

  user: User = {
    id: null,
    email: "",
    name: "",
    password: ""
  }

  account: Account = {
    id: null,
    type: "",
    user: {
      email: "",
      id: this.authorizationService.getCurrentUserId(),
      name: "",
      password: ""
    }
  }

  constructor(
    private authorizationService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private accountService: AccountService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
   this.email = this.route.snapshot.paramMap.get('email');
   this.userService.findByEmail(this.email).subscribe((data: User) => {
   this.user = data;
    });
  }

  edit(){
    this.userService.editUser(this.email, this.user).subscribe(() => {
      this.toast.success(
        this.user.name,
        'Successfully changed user information',
        {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        });
        
    });
  }

  // autocomplete
  // selectEvent(item, fieldName) {
  //   console.log({ item, fieldName });
  //   if (fieldName === 'account') {
  //     this.patient.countryOfImport = item.name;
  //   } else {
  //     this.patient.citizenship = item.name;
  //   }
  //   console.log({ pac: this.patient });
  // }


}
