import { Injectable, OnDestroy } from '@angular/core';
import { AuthenService } from 'app/authentication/authen.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const URI_USER = environment.apiUrl + '/api/rrs/user';
const URI_USERPERMISSION = environment.apiUrl + '/api/rrs/userpermission';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService implements OnDestroy {

  permission: any = {};

   // Private
   private _unsubscribeAll: Subject<any>;

  constructor(
    private auth: AuthenService,
    private http: HttpClient
  ) { 
      // Set the private defaults
      this._unsubscribeAll = new Subject();

      console.log(this.auth.user.username);
      this.loginUser(this.auth.user.username)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res) => {
            // Nothing to do
          });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    // this.routeParams = route.params;
    // console.log("resolve with params : " + JSON.stringify(this.routeParams));
    // if (this.routeParams.id) {
    //   if (this.routeParams.id !== "new") {
    //     return this.getTvdscustomerData(this.routeParams.id);
    //   }
    // } else {
      // TODO : if network loss can't get user list , what happening
       return this.getUserList();
    // }
  }

  loginUser(username): Observable<any> {
    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };
    
    return this.getUserPermission(username)
                .pipe(
                  map((res:any) => {
                    // console.log(res);
                    this.permission = res.data;
                  }
                ));
  }

  getCurrUserPermission(): any {
    return this.permission;
  }

  /*
   * Get current Restuarant Permission for this user
   * @return : id string of restuarant
   * if is superadmin it is empty
   */
  getCurrRestuarantPermission(): any[] {
     return this.permission ? this.permission.restuarantId : [];
  }

  /*
   * Add user in rrs user permission
   * @param {json} body
   * body format
   * {
   *    username: "",
   *    firstname: "",
   *    displayname: "",
   *    email: "",
   *    position: "",
   *    roles: ["superadmin"],
   *    restuarantId: ["id1", "id2"],
   * }
   */
  addUser(body): Observable<any> {
    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };
      
    return this.http.post(URI_USER, body, header);
  }
  
  /*
   * get All user
   */
  getUserList(): Observable<any> {
    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };

    return this.http.get(URI_USER, header);
  }

  updateUserPermission(objId, updateData): Observable<any> {
    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };

    return this.http.put(`${URI_USER}/${objId}`, updateData, header);
  }

  /*
   * get user permission by username
   * @param {string} username
   */
  getUserPermission(username: string): Observable<any> {
    const body = {
      username: username,
    };

    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };

    // console.log(username);
    return this.http.post(URI_USERPERMISSION, body, header);   
  }

}
