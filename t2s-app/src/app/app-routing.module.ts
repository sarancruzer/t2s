import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent, AdminLayoutComponent } from './components/layouts';
import { AuthGuardService } from './services/auth-guard.service';



const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
    },
    ]
  },   
  {
    path: '',
    canActivate: [AuthGuardService],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'stores',
        loadChildren: () => import('./components/stores/stores.module').then(m => m.StoresModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./components/customers/customers.module').then(m => m.CustomersModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
