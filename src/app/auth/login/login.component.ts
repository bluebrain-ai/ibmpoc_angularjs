import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  model: ILogin = { userid: 'admin', password: 'admin@123' };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = '/home';
    this.authService.logout();
  }
  get form() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      this.message = 'Please enter your userid and password';

      return;
    } else {

      console.log(this.message);
      this.loaderService.showloader();
      if (
        this.form.userid.value == this.model.userid &&
        this.form.password.value == this.model.password
      ) {
        console.log('Login successful');
        this.message = ''
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.form.userid.value);
        this.router.navigate([this.returnUrl]);
        this.loaderService.hideLoader();
      } else {
        this.message = 'Please check your userid and password';
      }
      console.log(this.message);

    }



    // this.authenticateLoginService.login(this.login.email, this.login.password)
    //   .subscribe(data => {
    //     this.redirectToLoginPage();
    //   },
    //     error => {
    //       this.alertService.error('Invalid Username or Password');
    //       this.loading = false;
    //     });

  }
  closeAlert() {
    this.message = ''
  }
}
