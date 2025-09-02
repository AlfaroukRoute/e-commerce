import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, Response } from '../models/data.interface';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';




type decodedUser = { id: string; name: string; role: string };

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
  // !!!! {} login , null logout
  userDate: BehaviorSubject<any> = new BehaviorSubject(null);
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // !!!
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {
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
      `${environment.baseUrl}/auth/signup`,
      data
    );
  }
  login(data: UserDataLogin): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/auth/signin`,
      data
    );
  }

  // ! forgetPass email {email : ""}
  forgetPassword(email: string): Observable<{
    statusMsg: 'success' | 'fail';
    message: string;
  }> {
    return this.http.post<{
      statusMsg: 'success' | 'fail';
      message: string;
    }>(`${environment.baseUrl}/auth/forgotPasswords`, {
      email,
    });
  }

  //! verify code (code)
  verifyCode(code: string): Observable<{
    status?: 'Success' | 'fail';
    statusMsg?: 'success' | 'fail';
  }> {
    return this.http.post<{
      status?: 'Success' | 'fail';
      statusMsg?: 'success' | 'fail';
    }>(`/auth/verifyResetCode`, {
      resetCode: code,
    });
  }

  //! reset password (email , newPassword)

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/auth/resetPassword`,
      {
        email,
        newPassword,
      }
    );
  }

  // !!! login register ||| reload fe token
  decodedToken(token: string) {
    const decoded = jwtDecode(token);
    this.userDate.next(decoded);
    this.isLogin.next(true);
  }

  //! false logout
  //! 403 catch logout
  logOut() {
    localStorage.removeItem('token');
    this.userDate.next(null);
    this.isLogin.next(false);
    this.router.navigate(['/login']);
  }
}
