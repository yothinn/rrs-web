import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { Role } from 'app/user-permission/role';


const routes = [
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
  declarations: [
    CustomersListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    TranslateModule,
  
    FuseSharedModule
  ],
  exports: [
    CustomersListComponent
  ]
})
export class CustomersModule { }
