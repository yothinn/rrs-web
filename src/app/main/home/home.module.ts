import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { HomeComponent } from './home.component';
import { AuthenGuardService } from 'app/authentication/authen-guard.service';
import { Role } from 'app/type/role';

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
