import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { MAIN_NAVNAME, REST_NAVNAME } from 'app/navigation/navigation';


import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { Router } from '@angular/router';

import { UserPermissionService } from 'app/user-permission/user-permission.service';
import { AuthenService } from 'app/authentication/authen.service';

@Component({
    selector   : 'home',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseNavigationService: FuseNavigationService,
        private router: Router,
        private auth: AuthenService,
        private permission: UserPermissionService,
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, thai);
    }

    ngOnInit() {
        // Get user permission for restuarant
        this.permission.getUserPermission(this.auth.user.username)
            .then((res) => {
                // console.log(JSON.stringify(per));

                if (this.auth.isSuperadmin()) {
                    this.router.navigate(['dashboard']);
                } else {
                    this.router.navigate(['restuarant/dashboard']);
                }        
            })
            .catch((error) => {
                // TODO : When error , howto manage
                console.log(error);
            });
    }
}
