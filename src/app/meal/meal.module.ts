import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, 
         MatInputModule,  } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { Role } from 'app/user-permission/role';

import { MealInfoComponent } from './meal-info/meal-info.component';
import { MealService } from './meal.service';

const routes = [
  {
      path     : 'restuarant/meal/:restId/new',          
      component: MealInfoComponent,
      canActivate: [AuthenGuardService],  
      data: {
        isCreate: true,
      },
      resovle: { items: MealService }
  },
  {
    path     : 'restuarant/meal/:restId/:mealId',          
    component: MealInfoComponent,
    canActivate: [AuthenGuardService],  
    data: {
      isCreate: false,
    },
    resovle: { items: MealService }
},

];

@NgModule({
  declarations: [
    MealInfoComponent
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
    MatSlideToggleModule,
  ],
  exports: [
    MealInfoComponent
  ]
})
export class MealModule { }
