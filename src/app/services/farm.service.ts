import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Farm } from '../models/farm';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmService extends AbstractService<Farm> {

  constructor(httpClient: HttpClient) { 
    super(httpClient, "farm");
  }

  public userHasAccessToFarm(email: string): Observable<Farm[]> {
    return this.httpClient.get<Farm[]>(this.abstractURL + `/farm` + `/find-farm/${email}`);
  }
}
