import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authorization/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {

  id: number;
  account: Account = {
    id: null,
    type: "",
    user : {
      email: "",
      id: null,
      name: "",
      password: ""
    }
  }

  constructor(
    private authorizationService: AuthService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = + this.route.snapshot.paramMap.get('id');
    this.accountService.findById(this.id).subscribe((data: Account) => {
      this.account = data;
      console.log(this.account);
      });
  }

  edit(){
    this.accountService.edit(this.id, this.account).subscribe(_ =>
      this.toast.success(
        this.account.type,
        'Successfully changed',
        {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        }));
  this.router.navigate(['/accounts-table']);
  }
}
