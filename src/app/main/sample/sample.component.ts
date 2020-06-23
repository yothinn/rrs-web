import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { restuarantNav, backMainNav, MAIN_NAVNAME, REST_NAVNAME } from 'app/navigation/navigation';


import { locale as english } from './i18n/en';
import { locale as thai } from './i18n/th';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent
{
    bMainNav = true;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseNavigationService: FuseNavigationService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, thai);
    }

    onTest() {
        console.log("on test");
        if (this.bMainNav) {
            this._fuseNavigationService.setCurrentNavigation(REST_NAVNAME);
            this.bMainNav = false;
        } else {
            this._fuseNavigationService.setCurrentNavigation(MAIN_NAVNAME);
            this.bMainNav = true;
        }
    }
}
