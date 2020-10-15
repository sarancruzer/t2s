import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  FooterComponent,
  DashboardHeaderComponent,
  AdminSidebarComponent
 } from './components/shared';
import {
  AuthLayoutComponent,
  AdminLayoutComponent
} from './components/layouts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';

const APP_LAYOUTS = [
  AuthLayoutComponent,
  AdminLayoutComponent
];

const APP_COMPONENTS = [
  FooterComponent,
  DashboardHeaderComponent,
  AdminSidebarComponent
];

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    APP_COMPONENTS,
    APP_LAYOUTS,
    DashboardHeaderComponent,
    AdminSidebarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    ModalModule.forRoot(),
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
