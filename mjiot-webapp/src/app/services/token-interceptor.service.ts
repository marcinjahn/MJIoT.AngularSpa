import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private userService : UserService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('JWT Interceptor');
// add authorization header with jwt token if available
    let token = this.userService.getToken();
    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    // console.log(request);

    return next.handle(request);
}

}
