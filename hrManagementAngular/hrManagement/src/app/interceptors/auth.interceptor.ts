import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthserviceAllCompSharedService } from '../services/componentsSharedServices/authservice-all-comp-shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authAllComponents: AuthserviceAllCompSharedService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const username = this.authAllComponents.username;
    const password = this.authAllComponents.password;

    const authHeader = 'Basic ' + btoa(username + ':' + password);
    if (request.url.startsWith('http://localhost:8080/users/get?')) {
      return next.handle(request);
    }
    if (request.url.startsWith('http://localhost:8080/users/save')) {
      return next.handle(request);
    }
    if (request.url.startsWith('http://localhost:8080/users/unique')) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        Authorization: authHeader,
      },
    });

    return next.handle(request);
  }
}
