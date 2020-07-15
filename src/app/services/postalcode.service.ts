import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthenService } from 'app/authentication/authen.service';

// TODO :change , now use tvds postal code service
const API_POSTALCODE_URL = 'https://tvds-service-prod-7lgq2xsobq-de.a.run.app/api/postcodes';
@Injectable({
  providedIn: 'root'
})
export class PostalcodeService {

  constructor(
    private http: HttpClient,
    private auth: AuthenService
  ) { }

  getPostalCodeList(): Observable<any> {
    const header = {
      headers: this.auth.getAuthorizationHeader(),
    };

    return this.http.get(API_POSTALCODE_URL, header);
  }
}
