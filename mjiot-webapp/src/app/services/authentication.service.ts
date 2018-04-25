import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AuthenticationApiUrl } from '../injection-tokens';

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

    console.log('POST for token');
    console.log(this.authApiUrl);

    var request = this.http.get('https://jsonplaceholder.typicode.com/posts/1')
      .map(res => {
        console.log(res);
      }
    );

    return this.http.post<any>(this.authApiUrl, postBody, { headers: headers })
            .map(user => {
              console.log('INSIDE');
              debugger
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
 
                return user;
            });
  }

}
