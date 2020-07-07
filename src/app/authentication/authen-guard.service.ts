import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuardService {

  constructor(
    private router: Router,
    private auth: AuthenService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = window.localStorage.getItem(
      `token@${environment.appName}`
    );

    if (token) {
      if (route.data.allowRoles && 
          route.data.allowRoles.indexOf(this.auth.getRole()) === -1)
      {
        // role not authorised
        console.log('not authorised');
        this.router.navigate(['']);
        return false;
      }

      // authorised
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
