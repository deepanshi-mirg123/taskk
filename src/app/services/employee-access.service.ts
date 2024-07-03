import { EventEmitter, Injectable } from '@angular/core';
import { employee, login, signUp } from '../Interface/interface';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAccessService {
  invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router:Router) { }

  private apiUrl = 'http://localhost:3000/employee';

  Login(data: login) {
    console.log(data);
    this.http.get<signUp[]>(`http://localhost:3000/employee?email=${data.email}&password=${data.password}`, {
      observe: 'response'
    }).subscribe((result) => {
      if (result && result.body?.length) {
        const user = result.body.find(user => user.password === data.password);
        if (user) {
          localStorage.setItem('employee', JSON.stringify(user));
          this.router.navigate(['employee-home']);
          this.invalidUserAuth.emit(false);
        } else {
          this.invalidUserAuth.emit(true);
        }
      } else {
        this.invalidUserAuth.emit(true);
      }
    });
  }

  login(data: { email: string; password: string }): void {
    this.http.get<employee[]>(`${this.apiUrl}?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body?.length) {
          const user = result.body.find(user => user.password === data.password);
          if (user) {
            localStorage.setItem('employeeId', user.id.toString());
            this.invalidUserAuth.emit(false);
          } else {
            this.invalidUserAuth.emit(true);
          }
        } else {
          this.invalidUserAuth.emit(true);
        }
      });
  }
 
   userAuthReload(){
     if(localStorage.getItem('employee')){
       this.router.navigate(['employee-home']);
     }
   }
}
