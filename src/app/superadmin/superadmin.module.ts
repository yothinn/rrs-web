import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, 
         MatInputModule,  } from '@angular/material';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SuperadminService } from './superadmin.service';
import { Role } from 'app/type/role';
import { UserPermissionListComponent } from './user-permission-list/user-permission-list.component';
import { UserPermissionService } from './user-permission.service';
import { CustomersListComponent } from './customers-list/customers-list.component';

const routes = [
  {
      path     : 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthenGuardService],
      data : { allowRoles: [Role.Superadmin] },
      resolve: { items: SuperadminService },
  },
  {
    path     : 'permissions/list',
    component: UserPermissionListComponent,
    canActivate: [AuthenGuardService],
    data: {
      allowRoles: [
        Role.Superadmin,
        Role.Admin,
        Role.Manager
      ]
    },
    resolve: { items: UserPermissionService }
  },
  {
    path     : 'customers/list',
    component: CustomersListComponent,
    canActivate: [AuthenGuardService],
    data: {
      allowRoles: [Role.Superadmin]
    }
  }
];


@NgModule({
  declarations  : [
    DashboardComponent,
    UserPermissionListComponent,
    CustomersListComponent,
  ],
  imports       : [
    CommonModule,
    RouterModule.forChild(routes),

    TranslateModule,
  
    FuseSharedModule,
    MatCardModule,
    MatButtonModule,
    NgxDatatableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  exports       : [
    DashboardComponent,
    UserPermissionListComponent,
    CustomersListComponent
  ]
 
})
export class SuperadminModule { }
