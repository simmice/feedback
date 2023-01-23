import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../services/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signOut() {
    throw new Error('Method not implemented.');
  }
  loggedIn: boolean | undefined;

  constructor() { }
}