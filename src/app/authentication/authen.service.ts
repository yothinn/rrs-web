import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Role } from 'app/user-permission/role';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  jwt: JwtHelperService = new JwtHelperService();
  token: any;
  user: any;
  onUserDataChanged: BehaviorSubject<any>;

  constructor(
    private http: HttpClient
  ) {
    
    this.onUserDataChanged = new BehaviorSubject({});
    this.token = window.localStorage.getItem(`token@${environment.appName}`);
    this.user = this.token ? this.jwt.decodeToken(this.token) : null;
    if (this.user && this.user != null) {
      this.onUserDataChanged.next(this.user);
    }

  }

  login(data: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(`${environment.authApiUrl}/api/auth/signin`, data).subscribe((res: any) => {
        window.localStorage.setItem(`token@${environment.appName}`, res.token);
        this.token = window.localStorage.getItem(`token@${environment.appName}`);
        this.user = this.token ? this.jwt.decodeToken(this.token) : null;
        this.onUserDataChanged.next(this.user);
        resolve(this.user);
      }, reject);
    });

  }

  register(data: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(`${environment.authApiUrl}/api/auth/signup`, data).subscribe((res: any) => {
        window.localStorage.setItem(`token@${environment.appName}`, res.token);
        this.token = window.localStorage.getItem(`token@${environment.appName}`);
        this.user = this.token ? this.jwt.decodeToken(this.token) : null;
        this.onUserDataChanged.next(this.user);
        resolve(this.user);
      }, reject);
    });

  }

  logout(): Promise<any> {

    return new Promise((resolve, reject) => {
      window.localStorage.removeItem(`token@${environment.appName}`);
      this.token = window.localStorage.getItem(`token@${environment.appName}`);
      this.user = this.token ? this.jwt.decodeToken(this.token) : null;
      this.onUserDataChanged.next(this.user);
      resolve(this.user);
    });
  }

  getAuthorizationHeader() {
    // let token = environment.production ? window.localStorage.getItem(`token@${environment.appName}`) : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTcyNDIyNTE2Mzg5NzAwMWEyNzdlM2UiLCJmaXJzdG5hbWUiOiJ0aGVlcmFzYWsiLCJsYXN0bmFtZSI6InR1YnJpdCIsImRpc3BsYXluYW1lIjoidGhlZXJhc2FrIHR1YnJpdCIsInByb2ZpbGVJbWFnZVVSTCI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vaGZsdmxhdjA0L2ltYWdlL3VwbG9hZC92MTQ4NzgzNDE4Ny9nM2h3eWllYjdkbDd1Z2RnajN0Yi5wbmciLCJyb2xlcyI6WyJ1c2VyIl0sInVzZXJuYW1lIjoiMDg5NDQ0NzIwOCIsInByb3ZpZGVyIjoibG9jYWwiLCJpYXQiOjE1ODQ1NDYzNDIsImV4cCI6MTU5MTc0NjM0Mn0.zjKgz4zjfHLnB_F0WRsctN8mpygZfpmaxk2e0P2fP4o";
    let token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    return headers;
  }

  getRole(): string {
    return this.user.roles[0];
  }

  isSuperadmin(): boolean {
    return this.user.roles.indexOf(Role.Superadmin) >= 0;
  }
}
