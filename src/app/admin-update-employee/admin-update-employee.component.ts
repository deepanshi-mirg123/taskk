import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { employee } from '../Interface/interface';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-admin-update-employee',
  templateUrl: './admin-update-employee.component.html',
  styleUrls: ['./admin-update-employee.component.scss']
})
export class AdminUpdateEmployeeComponent {
  UpdateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    bloodgroup: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

 
  employeeData: undefined | employee;
  Message: undefined | string;
  constructor(private route: ActivatedRoute, private product: EmployeeService) { }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.employeeData = data;
      });
   
    this.UpdateForm.valueChanges.subscribe(value => {
      this.employeeData = value;
    });
  }
  submit(data: any) {
    if (this.employeeData) {
      data.id = this.employeeData.id;
    }
    this.product.updateEmployee(data).subscribe((result) => {
      if (result) {
        this.Message = 'Product has updated';
      }
    });
    setTimeout(() => {
      this.Message = undefined;
    }, 3000);
    console.warn(data);
  }
}
