import { Component, OnInit } from '@angular/core';
import { Farm } from 'src/app/models/farm';
import { AuthService } from 'src/app/authorization/auth.service';
import { Router, Params } from '@angular/router';
import { FarmService } from 'src/app/services/farm.service';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-farms-table',
  templateUrl: './farms-table.component.html',
  styleUrls: ['./farms-table.component.scss']
})
export class FarmsTableComponent implements OnInit {
  searchText;
  userFarms: Farm[] = [];
  pa = 1;

  farm: Farm = {
    id: null,
    farmName: "",
    user : {
      id : this.authorizationService.getCurrentUserId(),
      email: "",
      password: "",
      name: ""
    }
  }
  
  constructor(
    private authorizationService: AuthService,
    private toast: ToastrService,
    private router: Router,
    private farmService: FarmService) {
      router.events.subscribe((params: Params) => {
        this.ngOnInit();
      })
    }


  ngOnInit() {
    this.userHasAccessToFarm();
  }

  userHasAccessToFarm(){
    const email = this.authorizationService.getCurrentUser();
    if(email){
      this.farmService.userHasAccessToFarm(email).subscribe((data: Farm[]) => {
        this.userFarms = data;
      })
    }
      return null 
  }

  save(){
    this.farmService.save(this.farm).subscribe(() => {
      this.userHasAccessToFarm();
      this.toast.success(
        this.farm.farmName,
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
    return this.farmService.delete(id).subscribe(() => {
      this.userHasAccessToFarm();
      this.toast.success(
        this.farm.farmName,
        'Successfully created',
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
