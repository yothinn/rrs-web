import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, 
         MatInputModule,  } from "@angular/material";
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { RestuarantInfoComponent } from './restuarant-info/restuarant-info.component';
import { RestuarantDashboardComponent } from './restuarant-dashboard/restuarant-dashboard.component';
import { RestuarantHolidayComponent } from './restuarant-holiday/restuarant-holiday.component';
import { RestuarantService } from './restuarant.service';
import { Role } from 'app/type/role';
import { RestuarantMealComponent } from './restuarant-meal/restuarant-meal.component';
import { RestuarantUserComponent } from './restuarant-user/restuarant-user.component';

const routes = [
  {
      path     : 'restuarant/new',          
      component: RestuarantInfoComponent,
      canActivate: [AuthenGuardService],  
      data: {
        isCreate: true,
        allowRoles: [Role.Superadmin]
      }
  },
  {
    path     : 'restuarant/info/:id',          
    component: RestuarantInfoComponent,
    canActivate: [AuthenGuardService],  
    data: {
      isCreate: false
    },
    resolve: { items: RestuarantService }
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
  },
  {
    path     : 'restuarant/meal/:id/new',          
    component: RestuarantMealComponent,
    canActivate: [AuthenGuardService],  
    data: {
      isCreate: true,
    },
    resolve: { items: RestuarantService }
  },
  {
    path     : 'restuarant/meal/:id/:mealId',          
    component: RestuarantMealComponent,
    canActivate: [AuthenGuardService],  
    data: {
      isCreate: false,
    },
    resolve: { items: RestuarantService }
  },
  {
    path     : 'restuarant/user/:id',
    component: RestuarantUserComponent,
    canActivate: [AuthenGuardService],
    data: {
      allowRoles: [
        Role.Superadmin,
        Role.Admin,
        Role.Manager
      ]
    },
    resolve: { items: RestuarantService }
  }
];

@NgModule({
  declarations: [
    RestuarantInfoComponent,
    RestuarantDashboardComponent,
    RestuarantHolidayComponent,
    RestuarantMealComponent,
    RestuarantUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    TranslateModule,
  
    FuseSharedModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatCheckboxModule,
    NgxDatatableModule,
  ],
  exports: [
    RestuarantInfoComponent,
    RestuarantDashboardComponent,
    RestuarantHolidayComponent,
    RestuarantMealComponent,
    RestuarantUserComponent,
  ]
})
export class RestuarantModule { }
