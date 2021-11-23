import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse,} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import {catchError, filter, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const SYM_TKN = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router
  ) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (!request.url.startsWith('http') || !request.url.startsWith(environment.apiRoot)) {
    //   return next.handle(request);
    // }

    // const token = this.getToken();

    request = request.clone({
      setHeaders: {
        Accept: 'application/json; charset=utf-8',
        lang: 'KO'
      }
    });
    return next.handle(request).pipe(
      filter(err => err.type !== 0),
      tap(async response => {
        console.log(response, "res!")
        if (response instanceof HttpResponse && response.ok) {
          if (response.body.code === 3007) {
            this.redirect();
          }
        }
      }),
      catchError(response => {
        return throwError(response);
      })
    );
  }

  public getToken(): any {
    return localStorage.getItem(SYM_TKN) || '';
  }

  public redirect(): void {
    alert('로그인 정보가 만료되었거나, 다른 PC 에서 로그인 하였습니다.');
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
