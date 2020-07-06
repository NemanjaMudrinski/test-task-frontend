import { Component, OnInit } from '@angular/core';
import { FarmService } from 'src/app/services/farm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authorization/auth.service';
import { Farm } from 'src/app/models/farm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-farm-view',
  templateUrl: './farm-view.component.html',
  styleUrls: ['./farm-view.component.scss']
})
export class FarmViewComponent implements OnInit {
  id: number;

  farm: Farm = {
    id: null,
    farmName: "",
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
    private farmService: FarmService,
    private toast: ToastrService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.id = + this.route.snapshot.paramMap.get('id');
    this.farmService.findById(this.id).subscribe((data: Farm) => {
      this.farm = data;
      console.log(this.farm);
      });
  }
  
  edit(){
    this.farmService.edit(this.id, this.farm).subscribe(_ =>
      this.toast.success(
        this.farm.farmName,
        'Successfully changed',
        {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        }));
  this.router.navigate(['/farms-table']);
  }

}
