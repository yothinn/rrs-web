import { Injectable } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { restuarantNav, MAIN_NAVNAME, REST_NAVNAME } from 'app/navigation/navigation';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from 'app/authentication/authen.service';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';


const URI_RESTUARANT = environment.apiUrl + '/api/restuarants';

@Injectable({
  providedIn: 'root'
})
export class RestuarantService {

  routeParams: any;

  constructor(
    private _fuseNavigationService: FuseNavigationService,
    private auth: AuthenService,
    private http: HttpClient

  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    // Set nav bar to restuarant nav
    this._fuseNavigationService.setCurrentNavigation(REST_NAVNAME);

     // this.routeParams = route.params;
    // console.log("resolve with params : " + JSON.stringify(this.routeParams));
    // if (this.routeParams.id) {
    //   if (this.routeParams.id !== "new") {
    //     return this.getTvdscustomerData(this.routeParams.id);
    //   }
    // } else {
      //return this.getRestuarantList();
      // }

  }

  /*
   * get All user
   */
  getRestuarantList(): Observable<any> {
    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };

    return this.http.get(URI_RESTUARANT, header);
  }

}
