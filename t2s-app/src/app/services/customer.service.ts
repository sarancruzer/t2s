import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = environment.API_URL;
  constructor(private http: HttpClient) { }


  getCustomerList(params: any): Observable<any> {
    return this.http.post(this.url + 'customers/search', params);
  }

  createCustomer(params: any): Observable<any> {
    return this.http.post(this.url + 'customers', params);
  }

  

}
