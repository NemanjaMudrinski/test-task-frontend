import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FarmsTableComponent } from './components/farms-table/farms-table.component';
import { AuthInterceptor } from './authorization/auth-interceptor';
import { FilterSearchPipe } from './core/filter-search.pipe';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { MainComponent } from './components/main/main.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AccountViewComponent } from './components/account-view/account-view.component';
import { FarmViewComponent } from './components/farm-view/farm-view.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavigationBarComponent,
    ProfileComponent,
    FarmsTableComponent,
    FilterSearchPipe,
    AccountsTableComponent,
    MainComponent,
    AccountViewComponent,
    FarmViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    ToastrModule.forRoot()
  ],
  providers: [FilterSearchPipe,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
