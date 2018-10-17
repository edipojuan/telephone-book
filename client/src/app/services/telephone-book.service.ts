import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TelephoneBookService {
  baseUrl = `${environment.baseUrl}/telephone-book`;

  constructor(private http: HttpClient, private router: Router) {}

  get(params) {
    return this.http.get(this.baseUrl, { params: params }).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  create(data) {
    const body = JSON.stringify(data);
    return this.http.post(this.baseUrl, body, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  edit(data) {
    const body = JSON.stringify(data);
    return this.http.put(`${this.baseUrl}/${data._id}`, body, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  delete(id) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  extractData = (body: Response) => body || {};
  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
