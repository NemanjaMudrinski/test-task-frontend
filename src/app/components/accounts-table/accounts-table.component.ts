import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AuthService } from 'src/app/authorization/auth.service';
import { Router, Params } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss']
})
export class AccountsTableComponent implements OnInit {
  
  searchText;
  userAccounts: Account[] = [];
  pa = 1;

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
    private router: Router,
    private accountService: AccountService,
    private toast: ToastrService) {
      router.events.subscribe((params: Params) => {
        this.ngOnInit();
      })
    }


  ngOnInit() {
    this.userHasAccessToAccount();
  }

  userHasAccessToAccount(){
    const email = this.authorizationService.getCurrentUser();
    if(email){
      this.accountService.userHasAccessToAccount(email).subscribe((data: Account[]) => {
        this.userAccounts = data;
      })
    }
      return null 
  }

  save(){
    this.accountService.save(this.account).subscribe(() => {
      this.userHasAccessToAccount();
      this.toast.success(
        this.account.type,
        'Successfully created',
        {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        });
    })     
  }

  delete(id: number) {
    return this.accountService.delete(id).subscribe(() => {
      this.userHasAccessToAccount();
      this.toast.success(
        this.account.type,
        'Successfully deleted',
        {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        });
    })     
  }


  filterSearch(value: string) {
    this.searchText = value;
  }

}