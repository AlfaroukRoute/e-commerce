import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, Response } from '../models/data.interface';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

type decodedUser = {id: string , name : string , role : string}

export interface UserData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface UserDataLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  
  userDate: BehaviorSubject<any> = new BehaviorSubject(null);

  // userDate.next(null);
  // userDate.getValue();
  // useDate.subscribe({next})

  constructor(private http: HttpClient , @Inject(PLATFORM_ID) private platformId: any , private router : Router) {

    // !!! once
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.decodedToken(token);
      }
    }
  }

  register(data: UserData): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }
  login(data: UserDataLogin): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }

  // !!!
  decodedToken(token: string) {
    const decoded = jwtDecode(token);
    this.userDate.next(decoded);

    return decoded;
  }

  logOut(){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.userDate.next(null);


      this.router.navigate(['/login']);
    }
  }
}
