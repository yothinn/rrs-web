import { Injectable } from '@angular/core';
import { AuthenService } from 'app/authentication/authen.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
import { catchError } from 'rxjs/operators';

const URI_USER = environment.apiUrl + '/api/rrs/user';
const URI_USERPERMISSION = environment.apiUrl + '/api/rrs/userpermission';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {

  permission: any = {};

  constructor(
    private auth: AuthenService,
    private http: HttpClient
  ) { 
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    // this.routeParams = route.params;
    // console.log("resolve with params : " + JSON.stringify(this.routeParams));
    // if (this.routeParams.id) {
    //   if (this.routeParams.id !== "new") {
    //     return this.getTvdscustomerData(this.routeParams.id);
    //   }
    // } else {
       return this.getUserList();
    // }
  }

  /*
   *
   */
  getUserList(): Observable<any> {
    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };

    return this.http.get(URI_USER, header);
  }

   /*
   * get user permission by username
   * @param {string} username
   */
  getUserPermission(username: string): Promise<any> {
    const body = {
      username: username,
    };

    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };

    // console.log(username);
    return new Promise((resolve, reject) => {
      this.http.post(URI_USERPERMISSION, body, header)
        .subscribe(
          (res: any) => {
            this.permission = res.data;
            // console.log(this.permission);
            resolve(this.permission);
          },
          (err) => {
            reject(err);
          }
        );
    });
    
  }

  
}
