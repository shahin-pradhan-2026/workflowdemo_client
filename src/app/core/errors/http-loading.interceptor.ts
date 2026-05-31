import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SweetAlertEnum, SweetAlertService } from "../helpers/sweet-alert.service";

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
    constructor(private swal: SweetAlertService) { }

    intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        let element = document.getElementById('pageLoaderID')
        element.classList.add('loader-show');
        return next.handle(request).pipe(
            finalize(() => {
                element.classList.remove('loader-show');
            })
        ) as Observable<HttpEvent<any>>;
    }

    // intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    //     let element = document.getElementById('pageLoaderID')
    //     element.classList.add('loader-show');
    //     return next.handle(request).map(event => {
    //         // if (event instanceof HttpResponse && shouldBeIntercepted(event)) {
    //         //     event = event.clone({ body: resolveReferences(event.body) })
    //         // }   
    //         return event;
    //     }) as Observable<HttpEvent<any>>;
    // }
}