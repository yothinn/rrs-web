import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { HomeComponent } from './home.component';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { Role } from 'app/type/role';
import { RestuarantNotFoundComponent } from '../restuarant-not-found/restuarant-not-found.component';

const routes = [
    {
        path     : 'home',
        component: HomeComponent,
        canActivate: [AuthenGuardService],
        data: {
            allowRoles: [
                Role.Superadmin,
                Role.Admin,
                Role.Manager,
                Role.Staff
            ]
        }
    },
    {
        path     : 'restuarantnotfound',
        component:  RestuarantNotFoundComponent,
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        HomeComponent
    ]
})

export class HomeModule
{
}
