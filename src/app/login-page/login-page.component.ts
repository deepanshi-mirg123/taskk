import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { login, signUp } from '../Interface/interface';
import { AdminService } from '../services/admin.service';
import { EmployeeAccessService } from '../services/employee-access.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  showLogin = true;
  hide = true;
  loginForm: FormGroup = new FormGroup({
    role: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/[a-zA-Z0-9]+/),
      Validators.pattern(/[!@#$%^&*()_+{}|:"<>?]+/),
      Validators.pattern(/[A-Z]+/)
    ])

  });

  adminSignUp: FormGroup = new FormGroup({
    name: new FormControl('',),
    email: new FormControl(''),
    password: new FormControl(''),
    dateofBirth: new FormControl(''),
    bloodGroup: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    gender: new FormControl(''),
  })
  
  constructor(private admin: AdminService, private emp: EmployeeAccessService) { }
  authError: String = '';
  role: string = 'employee';

  openLogin() {
    this.showLogin = true
  }
  signUp(data: signUp): void {
    console.log(this.adminSignUp);
    this.admin.userSignUp(data);
  }
  openSignUp() {
    this.showLogin = false
  }
  login(data: signUp): void {
    console.log(this.loginForm);
    this.admin.userLogin(data);
    this.admin.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or password is not correct";
      }
    })
  }

  loginn(data: login) {
    console.log(this.loginForm);
    this.emp.Login(data);
    this.emp.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Invalid email or password";
      } else {
      }
    });
  }




}
