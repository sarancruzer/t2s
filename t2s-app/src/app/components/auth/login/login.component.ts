import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, SessionService]

})
export class LoginComponent implements OnInit {

  submitAttempt = false;
  form: FormGroup;
  authUser: any;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    ) {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/dashboard']);
      }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required]
    });
  }


  keyDownAuthenticate(event) {
    if (event.keyCode === 13) {
      this.authenticate();
    }
  }

  authenticate() {
    console.log('form called');
    console.log(this.form.value);
    this.submitAttempt = true;
    if (this.form.valid) {
      this.authService.authenticate(this.form.value).subscribe(res => {
          this.setLocalStorage(res.data, res.token);
          this.toastr.success('Successfully', res.message);
      },
        err => {
          console.log('error msg');
          console.log(err);
          this.toastr.error('Login failed', err.error.message);
        });
    }
  }


  setLocalStorage(user, token) {
    this.sessionService.setLocal('access_token', token);
    this.sessionService.setLocal('user', JSON.stringify(user));
    this.router.navigate(['/dashboard']);
  }


  navigate(url: any) {
    console.log(url);
    this.router.navigate([url]);
  }
}
