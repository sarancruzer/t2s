import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private url = environment.API_URL;
  constructor(private http: HttpClient) { }


  getStoreList(params: any): Observable<any> {
    return this.http.post(this.url + 'stores/search', params);
  }

  getStoreData(): Observable<any> {
    return this.http.get(this.url + 'stores');
  }

}
