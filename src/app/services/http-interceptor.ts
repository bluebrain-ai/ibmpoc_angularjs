import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';


import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { LoaderService } from './loader.service';

@Injectable()
export class CustomerHttpInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showloader();
    // const token: string = localStorage.getItem('token');

    // if (token) {
    //   request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    // }

    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }

    // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loaderService.hideLoader();
        }
        return event;
      }),
      catchError(error => {
        this.loaderService.hideLoader();
        return throwError(error);
      })
    )
  }
}