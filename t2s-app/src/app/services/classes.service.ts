import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private url = environment.API_URL;
  constructor(private http: HttpClient) { }


  getClassDetails(classId: string): Observable<any> {
    return this.http.get(this.url + 'class/details/' + classId);
  }

  getAllClassItems(params: any): Observable<any> {
    return this.http.post(this.url + 'class/all/items', params);
  }

  createClass(params: any): Observable<any> {
    return this.http.post(this.url + 'class/create', params);
  }

  joinClass(classId: any): Observable<any> {
    return this.http.post(this.url + 'class/join/' + classId, []);
  }

  updateKycComment(params: any, kycId: string): Observable<any> {
    return this.http.put(this.url + 'class/kyc/update/' + kycId, params);
  }

  

  
}
