import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, finalize } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  count = 0;

  constructor(private authService: AuthService, private router: Router, private sessionService: SessionService){
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    console.log('TokenInterceptor -> request.headers.get(Anonymous)', request.headers.get('Anonymous'));
    
    if (!this.authService.isAuthenticated() && request.headers.get('Anonymous') == null) {        
        // this.router.navigate(['/']);
    }
    
    this.count++;

    let headers: any;
    let cloneReq = request.clone({ });

    if (request.headers.get('Anonymous') !== undefined && request.headers.get('Anonymous') !== null) {
       headers = request.headers.delete('Anonymous')
       cloneReq = request.clone({ headers });
    } else {
      headers = request.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.sessionService.getToken()}`);
      cloneReq = request.clone({ headers });
    }

    return next.handle(cloneReq)
    .pipe(
    retry(1),
    tap(evt => {
      if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.status) {
              // this.spinner.hide();
          }
        }
     }),
     finalize(() => {
      this.count--;
      if (this.count === 0) {
      }
  }),
  // catchError((error: HttpErrorResponse) => {
  //  console.log('TokenInterceptor -> error', error.error);
   
  //  let errorMessage = '';
  //  if (error.error instanceof ErrorEvent) {
  //      // client-side error
  //      errorMessage = `Error: ${error.error.message}`;
  //    } else {
  //      // server-side error
  //      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //    }
  //  return throwError(errorMessage);
  //  })
 );

}
}
