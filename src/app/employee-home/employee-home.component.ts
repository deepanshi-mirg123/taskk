import { HttpClient} from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { employee } from '../Interface/interface';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent  implements OnInit{
  employees: employee[] = [];
  
  constructor(private http: HttpClient, private employee: EmployeeService) {}
  ngOnInit(): void {
    this.employee.getEmployee().subscribe((data: employee[]) => {
      this.employees = data;
    });
  }
  
}

