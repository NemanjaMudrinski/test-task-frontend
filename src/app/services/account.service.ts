import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Account } from '../models/account';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends AbstractService<Account> {

  constructor(httpClient: HttpClient) { 
    super(httpClient, "account");
  }

  public userHasAccessToAccount(email: string): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.abstractURL + `/account` + `/find-account/${email}`);
  }
}
