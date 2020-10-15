import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  user: any;
  constructor(
    private router: Router,
    private sessionService: SessionService,
    ) {
    const user = this.sessionService.getLocal('user');
    if (user) {
      this.user = JSON.parse(user);
    }   
   }

  ngOnInit(): void {
  }


  logout() {
    console.log('DashboardHeaderComponent -> logout -> logout');    
      localStorage.clear();
      this.router.navigate(['/auth/login']);  
  } 
}
