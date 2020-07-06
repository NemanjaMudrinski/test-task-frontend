import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T extends Entity<T>> {

  abstractURL = `http://cyrillic-software.us-east-1.elasticbeanstalk.com/api`
  // abstractURL = `http://localhost:5000/api`
  
  entityName: string;
  httpClient: HttpClient;

  constructor(private http: HttpClient, entityName) {
    this.httpClient = http;
    this.entityName = entityName;
  }


public findAll(): Observable<T[]> {
  return this.http.get<T[]>(this.abstractURL + '/' + this.entityName + '/all');
}

public findById(id:number): Observable<T> {
  return this.http.get<T>(this.abstractURL + '/' + this.entityName + `/${id}`);
}

public save(entity: T): Observable<T> {
  return this.http.post<T>(this.abstractURL + '/' + this.entityName + '/add', entity);
}

public edit(id : number, entity: T): Observable<T> {
  return this.http.put<T>(this.abstractURL + '/' + this.entityName + `/${id}`, entity);
}

public delete(id: number): Observable<T> {
  return this.http.delete<T>(this.abstractURL + '/' + this.entityName + `/${id}` );
}

  
}
