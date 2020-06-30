import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, 
         MatInputModule,  } from "@angular/material";



import { UserPermissionListComponent } from './user-permission-list/user-permission-list.component';
import { UserPermissionDialogComponent } from './user-permission-dialog/user-permission-dialog.component';

const routes = [
  {
      path     : 'permissions/list',
      component: UserPermissionListComponent,
//        canActivate: [AuthenGuardService]
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
  ],
  exports: [
    UserPermissionListComponent
  ],
  entryComponents: [
    UserPermissionDialogComponent
  ]
})
export class UserPermissionModule { }
