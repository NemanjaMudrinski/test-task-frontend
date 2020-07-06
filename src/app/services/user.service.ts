import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<User> {

  constructor(httpClient: HttpClient) { super(httpClient, "user"); }

  public findByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.abstractURL + `/user/email/${email}`);
  }
 
  public editUser(email : string, entity: User): Observable<User> {
    return this.httpClient.put<User>(this.abstractURL + `/user/edit/${email}`, entity);
  }

}
