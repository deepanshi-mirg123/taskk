import { Component } from '@angular/core';
import { employee } from '../Interface/interface';
import { EmployeeService } from '../services/employee.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
 
})
export class AdminHomeComponent {
  productList: undefined | employee[];
  productMessage: undefined | string;
  data: any;
  item: any;
  Cards: employee[] | undefined;
  showLoading: boolean | undefined;
  modalRef: BsModalRef | undefined;

  constructor(private employee: EmployeeService, public modalService: BsModalService) { }

  ngOnInit(): void {
    this.list();
  }

  deleteEmployee(id: number) {
    this.employee.deleteEmployee(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.employee.getEmployee().subscribe((result) => {
      if (result) {
        this.productList = result;
        console.log(this.productList);
      }
    });
  }

  submit(event: any) {
    if (event) {
      this.employee.getEmployee().subscribe(
        res => {
          if (res) {
            console.log(res);
            setTimeout(() => {
              this.Cards = res;
              this.showLoading = false;
            }, 1000);
          }
        },
        () => {
          this.Cards = [];
          this.showLoading = false;
        }
      );
    }
  }


}
