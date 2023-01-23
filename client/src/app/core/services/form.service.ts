import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Form } from './form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  options!: Form[];
  readonly baseURL = 'http://localhost:3000/form';
  httpHeaders: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  constructor(private http: HttpClient) { }

  //Adding  Form Details
  postForm(ff : any): Observable<any>{
    return this.http.post(this.baseURL, ff).pipe(catchError(this.handleError));
  }

  postStatus(email : any): Observable<any>{
    return this.http.post('http://localhost:3000/status', {email:email}).pipe(catchError(this.handleError));
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
