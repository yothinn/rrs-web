import { Injectable } from '@angular/core';
import { AuthenService } from 'app/authentication/authen.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
import { catchError } from 'rxjs/operators';

const URI_USER = environment.apiUrl + '/api/rrs/user';
const URI_USERPERMISSION = environment.apiUrl + 'api/rrs/userpermission';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {

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
    //   return this.getTvdscustomerDataList(0, 10, '');
    // }
  }

  private handleError(error: HttpErrorResponse | any) {
    //   if (error.error instanceof ErrorEvent) {
    //     // A client-side or network error occurred. Handle it accordingly.
    //     console.error('An error occurred:', error.error.message);
    //   } else {
    //     // The backend returned an unsuccessful response code.
    //     // The response body may contain clues as to what went wrong,
    //     console.error(
    //       `Backend returned code ${error.status}, ` +
    //       `body was: ${error.error}`);
    //   }
    //   // return an observable with a user-facing error message
    //   return throwError(
    //     'Something bad happened; please try again later.');
    // };
  }

   /*
   * get user permission by username
   * @param {string} username
   */
  getUserPermission(username: string): Observable<any> {
    const body = {
      username: username,
    };

    return this.http.post(URI_USERPERMISSION, body,
      { 
        headers: this.auth.getAuthorizationHeader()
      });
  }

  
}
