import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SuperadminService } from './superadmin.service';
import { Role } from 'app/user-permission/role';

const routes = [
  {
      path     : 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthenGuardService],
      data : { allowRoles: [Role.Superadmin] },
      resolve: { items: SuperadminService },
  }
];


@NgModule({
  declarations  : [
    DashboardComponent
  ],
  imports       : [
    CommonModule,
    RouterModule.forChild(routes),

    TranslateModule,
  
    FuseSharedModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports       : [
    DashboardComponent
  ]
 
})
export class SuperadminModule { }
