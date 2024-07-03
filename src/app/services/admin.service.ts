import { HttpClient} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { signUp} from '../Interface/interface'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  invalidUserAuth= new EventEmitter<boolean>(false)
  isAdminLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)
  isLoginErrorSubject: any;
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:signUp){
    console.log(data);
    this.http.post('http://localhost:3000/admin',
    data,
    {observe:'response'}).subscribe((result)=>{
      console.warn(result,"signup")
      if(result){
        localStorage.setItem('admin',JSON.stringify(result.body))
        this.router.navigate(['admin-home'])
      }
    })
  } 
  reloadSeller(){
    if(localStorage.getItem('admin')){
      this.isAdminLoggedIn.next(true)
      this.router.navigate(['admin-home'])
    }
  }

 
  userLogin(data: { email: string, password: string }): void {
    console.log(data);
    this.http.get(`http://localhost:3000/admin?email=${data.email}`, { observe: 'response' })
      .subscribe((result: any) => {
        console.warn(result, "login");
        if (result && result.body && result.body.length === 1) {
          const user = result.body[0];
          if (user.password === data.password) {
            this.isLoginError.emit(false);
            localStorage.setItem('admin', JSON.stringify(user));
            this.router.navigate(['admin-home']);
          } else {
            console.warn("login failed: incorrect password");
            this.isLoginError.emit(true);
          }
        } else {
          console.warn("login failed: email not found");
          this.isLoginError.emit(true);
        }
      });
  }
}
