import { Injectable } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { restuarantNav, MAIN_NAVNAME, REST_NAVNAME } from 'app/navigation/navigation';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuperadminService {

  routeParams: any;

  constructor(
    private _fuseNavigationService: FuseNavigationService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    // Set nav bar to restuarant nav
    this._fuseNavigationService.setCurrentNavigation(MAIN_NAVNAME);

    console.log("resolve with params : " + JSON.stringify(this.routeParams));

  }
}
