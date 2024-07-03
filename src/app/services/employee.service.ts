import { EventEmitter, Injectable } from '@angular/core';
import { employee } from '../Interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  addEmployee(data: employee) {
    return this.http.post('http://localhost:3000/employee', data);
  }
  getEmployee() {
    return this.http.get<employee[]>('http://localhost:3000/employee');
  }

  getEmployeeById(id: number) {
    return this.http.get<employee[]>(`http://localhost:3000/employee/${id}`);
  }
  deleteEmployee(id: number) {
    return this.http.delete(`http://localhost:3000/employee/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<employee>(`http://localhost:3000/employee/${id}`);
  }

  updateEmployee(employee: employee) {
    return this.http.put<employee>(
      `http://localhost:3000/employee/${employee.id}`,
      employee
    );
  }
}
