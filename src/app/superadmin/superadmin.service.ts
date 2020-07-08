import { Injectable } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { restuarantNav, MAIN_NAVNAME, REST_NAVNAME } from 'app/navigation/navigation';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RestuarantService } from 'app/restuarant/restuarant.service';


@Injectable({
  providedIn: 'root'
})
export class SuperadminService {

  routeParams: any;

  constructor(
    private _fuseNavigationService: FuseNavigationService,
    private restuarant: RestuarantService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    // Set nav bar to restuarant nav
    this._fuseNavigationService.setCurrentNavigation(MAIN_NAVNAME);

     // this.routeParams = route.params;
    // console.log("resolve with params : " + JSON.stringify(this.routeParams));
    // if (this.routeParams.id) {
    //   if (this.routeParams.id !== "new") {
    //     return this.getTvdscustomerData(this.routeParams.id);
    //   }
    // } else {
      return this.restuarant.getRestuarantList();
      // }

  }
}
