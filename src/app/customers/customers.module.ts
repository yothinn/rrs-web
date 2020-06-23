import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

import { CustomersListComponent } from './customers-list/customers-list.component';

const routes = [
  {
      path     : 'customers/list',
      component: CustomersListComponent,
//        canActivate: [AuthenGuardService]
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
