import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  info!: User[];
  readonly baseURL = 'http://localhost:3000/form';
  httpHeaders: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  constructor(private http: HttpClient) { }

  //Adding  Form Details
  postUser(info : any): Observable<any>{
    return this.http.post(this.baseURL, info).pipe(catchError(this.handleError));
  }

  //Error
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Handle client side error
      errorMessage = error.error.message;
    } else {
      //Handle server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
