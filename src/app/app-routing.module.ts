import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAddEmployeeComponent } from './admin-add-employee/admin-add-employee.component';
import { AdminUpdateEmployeeComponent } from './admin-update-employee/admin-update-employee.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    component: LoginPageComponent,
    path: 'login'
  },
  {
    component: AdminHomeComponent,
    path: 'admin-home',
    canActivate: [AuthGuard]

  },
  {
    component: AdminAddEmployeeComponent,
    path: 'admin-add-employee',
    canActivate: [AuthGuard]
  },
  {
    component: AdminUpdateEmployeeComponent,
    path: 'admin-update-employee/:id',
    canActivate: [AuthGuard]
  },
  {
    component: EmployeeHomeComponent,
    path: 'employee-home',
   
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
