import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, 
         MatInputModule,  } from "@angular/material";
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';




import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

import { RestuarantInfoComponent } from './restuarant-info/restuarant-info.component';
import { RestuarantDashboardComponent } from './restuarant-dashboard/restuarant-dashboard.component';
import { RestuarantHolidayComponent } from './restuarant-holiday/restuarant-holiday.component';
import { RestuarantService } from './restuarant.service';
import { Role } from 'app/user-permission/role';

const routes = [
  {
      path     : 'restuarant/new',          // restuarant;id=new , restuarant;id=xxx
      component: RestuarantInfoComponent,
//      resolve: { items: RestuarantService }
//        canActivate: [AuthenGuardService]
  },
  {
    path     : 'restuarant/dashboard/:id',      
    component: RestuarantDashboardComponent,
    canActivate: [AuthenGuardService],
    resolve: { items: RestuarantService },
  },
  {
    path     : 'restuarant/holiday/:id',        
    component: RestuarantHolidayComponent,
    canActivate: [AuthenGuardService],
    resolve: { items: RestuarantService }
    
  }
];

@NgModule({
  declarations: [
    RestuarantInfoComponent,
    RestuarantDashboardComponent,
    RestuarantHolidayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    TranslateModule,
  
    FuseSharedModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  exports: [
    RestuarantInfoComponent,
    RestuarantDashboardComponent,
    RestuarantHolidayComponent
  ]
})
export class RestuarantModule { }
