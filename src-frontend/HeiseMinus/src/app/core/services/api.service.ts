import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators'

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string): Observable<any> {
    return this.http.get(`${path}`)
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object): Observable<any> {
    return this.http.put(
      `${path}`,
      JSON.stringify(body)
      ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object): Observable<any> {
    return this.http.post(
      `${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
