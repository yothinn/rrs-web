import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, 
         MatInputModule,
         MatCardModule,
         MatMenuModule,  } from '@angular/material';

import { Role } from 'app/type/role';

import { UserPermissionService } from './user-permission.service';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { DashboardService } from './dashboard.service';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserPermissionListComponent } from './user-permission-list/user-permission-list.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { RestuarantNotFoundComponent } from './restuarant-not-found/restuarant-not-found.component';
import { UserPermissionDialogComponent } from './user-permission-dialog/user-permission-dialog.component';

const routes = [
    {
        path     : 'home',
        component: HomeComponent,
        canActivate: [AuthenGuardService],
    },
    {
        path     : 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenGuardService],
        // data : { allowRoles: [Role.Superadmin] },
        resolve: { items: DashboardService },
    },
    {
        path     : 'permissions/list',
        component: UserPermissionListComponent,
        canActivate: [AuthenGuardService],
        data: {
            allowRoles: [Role.Superadmin,]
        },
        resolve: { items: UserPermissionService }
    },
    {
        path     : 'customers/list',
        component: CustomersListComponent,
        canActivate: [AuthenGuardService],
        data: {
            allowRoles: [Role.Superadmin]
        }
     },
     {
        path     : 'restuarantnotfound',
        component:  RestuarantNotFoundComponent,
    }
];

@NgModule({
    declarations: [
        HomeComponent,
        DashboardComponent,
        UserPermissionListComponent,
        UserPermissionDialogComponent,
        CustomersListComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        MatCardModule,
        MatButtonModule,
        NgxDatatableModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
    ],
    exports     : [
        HomeComponent,
        DashboardComponent,
        UserPermissionListComponent,
        UserPermissionDialogComponent,
        CustomersListComponent
    ],
    entryComponents: [
        UserPermissionDialogComponent
      ],
})

export class HomeModule
{
}
