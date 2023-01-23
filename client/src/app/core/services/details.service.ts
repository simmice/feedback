// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// // import 'rxjs/add/operator/map';
// // import 'rxjs/add/operator/toPromise';

// import { Details } from './details.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class DetailsService {
//   details!: Details[];
//   readonly baseURL = 'http://localhost:3000/details';
//   httpHeaders: HttpHeaders | { [header: string]: string | string[]; } | undefined;

//   constructor(private http : HttpClient) { }

//   //Adding recorders
//   postDetails(det : String):Observable<any>{
//     return this.http.post(this.baseURL, {"services":det}).pipe(catchError(this.handleError));
//   }

//   //Get all Details
//   getDetails(){
//     return this.http.get(this.baseURL);
//   }

//   //Get Single Detail
//   getDetail(id:any): Observable<any>{
//     return this.http.get(`${this.baseURL}/read-detail/${id}`, {headers:this.httpHeaders}).pipe(map((res:any) => {
//       return res || {}
//     }),
//     catchError(this.handleError)
//     )
//   }

//   //Error
//   handleError(error: HttpErrorResponse){
//     let errorMessage = '';
//     if(error.error instanceof ErrorEvent) {
//       // Handle client side error
//       errorMessage = error.error.message;
//     } else {
//       //Handle server side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.log(errorMessage);
//     return throwError(errorMessage);
//   }
// }
