import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './authorization/role.guard';
import { FarmsTableComponent } from './components/farms-table/farms-table.component';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { MainComponent } from './components/main/main.component';
import { AccountViewComponent } from './components/account-view/account-view.component';
import { FarmViewComponent } from './components/farm-view/farm-view.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile/:email', component: ProfileComponent},
  { path: 'farms-table', component: FarmsTableComponent},
  { path: 'farm-view/:id', component: FarmViewComponent},
  { path: 'accounts-table', component: AccountsTableComponent},
  { path: 'account-view/:id', component: AccountViewComponent},
  { path: 'home', component: MainComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
