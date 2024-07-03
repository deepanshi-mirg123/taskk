import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuType: string = '';
  sellerName:string="";
  userName:string="";
  constructor(private route: Router, private product:AdminService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        if (localStorage.getItem('admin') && val.url.includes('admin')) {
          console.log("in admin area");
          const adminStore = localStorage.getItem('admin');
          const adminData = adminStore && JSON.parse(adminStore)[0];
          this.sellerName = adminData?.name;
          this.menuType = 'admin';
        } else if (localStorage.getItem('employee') && val.url.includes('employee')) {
          console.log("inside employee area");
          const userStore = localStorage.getItem('employee');
          const userData = userStore && JSON.parse(userStore);
          this.userName = userData?.name;
          this.menuType = 'employee';
        } else {
          this.menuType = ''; 
        }
      }
    });
  }
  logout(){
    localStorage.removeItem('admin');
    this.route.navigate([''])
  }

  userLogout(){
    localStorage.removeItem('employee');
    this.route.navigate([''])
  }
}
