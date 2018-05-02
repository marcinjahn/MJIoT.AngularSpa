import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { AuthenticationApiUrl } from '../injection-tokens';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, @Inject(AuthenticationApiUrl) private authApiUrl ) { }

  login(login: string, password: string) {
    let postBody = {
      Username: login,
      Password: password
    };

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      this.http.post<any>(this.authApiUrl, postBody, { headers: headers })
      .subscribe(token => {
          if (token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('mjiotToken', token);
              resolve(true);
          }
        },
        error => {
          resolve(false);
        }
      )

    });
  }

  logout() {
    localStorage.removeItem('mjiotToken');
  }

}
