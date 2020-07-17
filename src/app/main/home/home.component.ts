import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';


import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';
import { Router } from '@angular/router';

import { UserPermissionService } from 'app/main/user-permission.service';
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
        // Superadmin login
        if (this.auth.isSuperadmin()) {
            this.router.navigate(['dashboard']);
        } else {
            // Admin, manager, staff login
            const restPermission = this.permission.getCurrRestuarantPermission();
            const restLen = restPermission.length; 
            
            console.log(`restLen : ${restLen} : ${restPermission}`);
            switch (restLen) {
                case 0:
                    // Case not assign restuarant
                    this.router.navigate(['restuarantnotfound']);    
                    break;
                case 1:
                    // Route to restuarant page
                    this.router.navigate(['restuarant/dashboard', restPermission[0]]);
                    break;
                default:
                    // Route to dashboard for select restuarant
                    this.router.navigate(['dashboard']);
                    break;

            } 
        }        
    }

}
