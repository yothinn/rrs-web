import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

import { UserPermissionListComponent } from './user-permission-list/user-permission-list.component';

const routes = [
  {
      path     : 'permissions/list',
      component: UserPermissionListComponent,
//        canActivate: [AuthenGuardService]
  }
];

@NgModule({
  declarations: [
    UserPermissionListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    TranslateModule,
  
    FuseSharedModule
  ],
  exports: [
    UserPermissionListComponent
  ]
})
export class UserPermissionModule { }
