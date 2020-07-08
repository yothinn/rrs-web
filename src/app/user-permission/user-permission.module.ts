import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, 
         MatInputModule,  } from '@angular/material';


import { UserPermissionService } from './user-permission.service';

import { UserPermissionListComponent } from './user-permission-list/user-permission-list.component';
import { UserPermissionDialogComponent } from './user-permission-dialog/user-permission-dialog.component';
import { Role } from './role';

const routes = [
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
  }
];

@NgModule({
  declarations: [
    UserPermissionListComponent,
    UserPermissionDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    TranslateModule,
  
    FuseSharedModule,

    NgxDatatableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    UserPermissionListComponent
  ],
  entryComponents: [
    UserPermissionDialogComponent
  ]
})
export class UserPermissionModule { }
