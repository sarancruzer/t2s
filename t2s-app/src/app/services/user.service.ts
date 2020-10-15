import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.API_URL;
  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<any> {
    return this.http.get(this.url + 'users/details/kyc');
  }

  getUserDetailsForKyc(userId: any): Observable<any> {
    return this.http.get(this.url + 'users/details/kyc/' + userId);
  }




}
