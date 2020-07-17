import { Injectable } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { restuarantNav, MAIN_NAVNAME, REST_NAVNAME } from 'app/navigation/navigation';

import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RestuarantService } from 'app/restuarant/restuarant.service';
import { AuthenService } from 'app/authentication/authen.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  routeParams: any;

  constructor(
    private _fuseNavigationService: FuseNavigationService,
    private restuarant: RestuarantService,
    private auth: AuthenService,
  ) { 

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    this.initMainNav();

    return this.restuarant.getRestuarantList();

  }

  private initMainNav(): void {
   
    // current nav bar is main , not initial
    if (this._fuseNavigationService.getCurrentNavigation() === MAIN_NAVNAME) {
      return;
    }
    
    // Set nav bar to restuarant nav
    this._fuseNavigationService.setCurrentNavigation(MAIN_NAVNAME);

    // Admin, manager, staff , hide permission, add restuarant, customer
    const hide = !this.auth.isSuperadmin();
    
    this._fuseNavigationService.updateNavigationItem('addRestuarant', 
          { hidden: hide } );
    
    this._fuseNavigationService.updateNavigationItem('permission', 
          { hidden: hide } );

    this._fuseNavigationService.updateNavigationItem('customer', 
          { hidden: hide } );
  }

}
