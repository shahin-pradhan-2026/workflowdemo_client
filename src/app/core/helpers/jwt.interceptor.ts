import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { LOCALSTORAGE_KEY } from '../models/localstorage-item';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (environment.defaultauth === 'firebase') {
        //     const currentUser = this.authenticationService.currentUser();
        //     // if (currentUser && currentUser.token) {
        //     //     request = request.clone({
        //     //         setHeaders: {
        //     //             Authorization: `Bearer ${currentUser.token}`
        //     //         }
        //     //     });
        //     // }
        // } else {
        //     // add authorization header with jwt token if available
        //     const currentUser = this.authfackservice.currentUserValue;




        //     // if (currentUser && currentUser.token) {
        //     //     request = request.clone({
        //     //         setHeaders: {
        //     //             Authorization: `Bearer ${currentUser.token}`
        //     //         }
        //     //     });
        //     // }
        // }
        let token = localStorage.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

        }
        return next.handle(request);
    }
}
