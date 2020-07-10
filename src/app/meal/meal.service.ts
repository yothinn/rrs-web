import { Injectable } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from 'app/authentication/authen.service';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  routeParams: any;

  constructor(
    private _fuseNavigationService: FuseNavigationService,
    private auth: AuthenService,
    private http: HttpClient,
  ) { 

  }

  resolve(route: ActivatedRouteSnapshot,  
    state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    
      this.routeParams = route.params;

      console.log("resolve with params : " + JSON.stringify(this.routeParams));
  }

}
