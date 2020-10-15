import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.API_URL;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    console.log('AuthService -> isAuthenticated -> token', token);
    // Check whether the token is expired and return
    // true or false
    const flag = this.jwtHelper.isTokenExpired(token);
    console.log('token expired');
    console.log(flag);
    return !flag;
  }

  authenticate(params: any): Observable<any> {
    const body = {
      email: params.email,
      password: params.password
    };
    return this.http.post(this.url + 'auth/login', body);
  }

  register(params: any): Observable<any> {
    return this.http.post(this.url + 'auth/register', params, { headers: { Anonymous: '' }});
  }

  verifyToken(params: any): Observable<any> {
    return this.http.post(this.url + 'auth/token/verify', params, { headers: { Anonymous: '' }});
  }

  resendVerifyLink(params: any): Observable<any> {
    return this.http.post(this.url + 'auth/token/resend', params, { headers: { Anonymous: '' }});
  }

  createPassword(params: any): Observable<any> {
    return this.http.post(this.url + 'auth/password/create', params);
  }

  signupwithGoogle(params: any): Observable<any> {
    return this.http.post(this.url + 'auth/google', params);
  }

  sendEmailForgotPassword(params: any): Observable<any> {
    return this.http.post(this.url + 'auth/password/forgot', params, { headers: { Anonymous: '' }});
  }





}
