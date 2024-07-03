import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EmployeeService } from '../services/employee.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-admin-add-employee',
  templateUrl: './admin-add-employee.component.html',
  styleUrls: ['./admin-add-employee.component.scss'],
})
export class AdminAddEmployeeComponent implements OnInit{

  addEmployeeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    bloodgroup: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    number: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    designation: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })
  @Input() modalService!: BsModalService
  @Input() data: any;
  @Input() rowdata: any;
  modalRef: BsModalRef | undefined;
  @Output() submitSuccess = new EventEmitter();
  constructor(private adminService: EmployeeService,) {

  }

  ngOnInit(): void {
    if (this.data?.id) {
      this.editForm(this.data?.id)
    }
  }



  editForm(id: number) {
    this.adminService.getEmployeeById(id).subscribe((res: any) => {
      console.log(res);
      let formData = {
        planName: this.addEmployeeForm.get('name')?.setValue(this.data.name),
        email: this.addEmployeeForm.get('email')?.setValue(this.data.email),
        dateofbirth: this.addEmployeeForm.get('dateofbirth')?.setValue(this.data.dateofbirth),
        bloodgroup: this.addEmployeeForm.get('bloodgroup')?.setValue(this.data.bloodgroup),
        password: this.addEmployeeForm.get('password')?.setValue(this.data.password),
      }

      this.addEmployeeForm.setValue(formData)
    })
  }
  cancel() {
    this.modalService?.hide();
  }

  submit() {
    if (this.addEmployeeForm.valid) {
      this.adminService.addEmployee(this.addEmployeeForm.value).subscribe({
        next: (val: any) => {
          console.log(val)
          alert('Employee Added');
        },
        error: (err: any) => {
          console.log(err)
        }
      })

    }
  }
}
