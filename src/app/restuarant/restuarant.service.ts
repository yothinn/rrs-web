import { Injectable } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { restuarantNav, 
          MAIN_NAVNAME, 
          REST_NAVNAME,
          REST_DASHBOARD_URL,
          REST_INFO_URL,
          REST_MEAL_URL,
          REST_USER_URL,
          REST_HOLIDAY_URL } from 'app/navigation/navigation';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { AuthenService } from 'app/authentication/authen.service';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { UserPermissionService } from 'app/superadmin/user-permission.service';


const URI_RESTUARANT = environment.apiUrl + '/api/restuarants';

@Injectable({
  providedIn: 'root'
})
export class RestuarantService {

  routeParams: any;
  restId: any;


  constructor(
    private _fuseNavigationService: FuseNavigationService,
    private auth: AuthenService,
    private http: HttpClient,
    private permission: UserPermissionService,

  ) { }

  resolve(route: ActivatedRouteSnapshot,  
            state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    
    this.restId = this.routeParams.id;
      
    // console.log("resolve with params : " + JSON.stringify(this.routeParams));
    console.log(this.restId);

    // initial nav bar (necessary use restuarant id)
    this.initRestuarantNav();

    // แยกแต่่ละ route ด้วย route.url
    const url = `/${route.url[0].path}/${route.url[1].path}`;
    // console.log(route);
    // console.log(url);

    switch (url) {
      case REST_DASHBOARD_URL:
        // TODO: change later : get mealinfo
        return this.getRestuarantInfo(this.restId);
      case REST_INFO_URL:
        return this.getRestuarantInfo(this.restId);
      case REST_USER_URL:
        // concurrent multiple request
        return forkJoin([
          this.getRestuarantInfo(this.restId),
          this.permission.getUserList()
        ]);
      case REST_HOLIDAY_URL:
        // TODO: chanage later : get holiday info
        return this.getRestuarantInfo(this.restId);
    }

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

   /*
  * get restuarant info by object id
  * @param {string} id : object id of restuarant
  */
  getRestuarantInfo(id): Observable<any> {
    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };

    return this.http.get(`${URI_RESTUARANT}/${id}`, header);
  }

  /*
   * create restuarant
   * @param {json data} restData => restuarant data 
   */
  createRestuarant(restData): Observable<any> {
    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };

    return this.http.post(URI_RESTUARANT, restData, header);
  }

  /*
   * update restuarant info
   * @param {string} id : object id
   * @param {json data} restData : restuarant data that upedate
   */
  updateRestuarant(id, restData): Observable<any> {
    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };

    return this.http.put(`${URI_RESTUARANT}/${id}`, restData, header);
  }

  /*
   * when route to restuarant , initial restuarant nav bar
   */
  private initRestuarantNav() {
   
    // current nav bar is restuarant , not initial
    if (this._fuseNavigationService.getCurrentNavigation() === REST_NAVNAME) {
      return;
    }
    
    // console.log('rest nav bar');

    // Set nav bar to restuarant nav
    this._fuseNavigationService.setCurrentNavigation(REST_NAVNAME);

    this._fuseNavigationService.updateNavigationItem('restDashboard', 
          { url: `${REST_DASHBOARD_URL}/${this.restId}`});
    
    this._fuseNavigationService.updateNavigationItem('restInfo', 
          { url: `${REST_INFO_URL}/${this.restId}`});

    this._fuseNavigationService.updateNavigationItem('addMeal', 
          { url: `${REST_MEAL_URL}/${this.restId}/new`});
    
    this._fuseNavigationService.updateNavigationItem('restUser', 
          { 
            url: `${REST_USER_URL}/${this.restId}`,
            hidden: this.auth.isStaff()
          });

    this._fuseNavigationService.updateNavigationItem('restHoliday', 
          { url: `${REST_HOLIDAY_URL}/${this.restId}`});
    
    // Back to main menu, only show when roles is superadmin
    this._fuseNavigationService.updateNavigationItem('backMain', 
          { hidden: !this.auth.isSuperadmin() } );
  }

}

