import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes = [
  {
      path     : 'dashboard',
      component: DashboardComponent,
//        canActivate: [AuthenGuardService]
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
