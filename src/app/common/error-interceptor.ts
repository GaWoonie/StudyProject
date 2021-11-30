import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, pipe, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {BoardService} from "../service/board.service";

@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {
//HTTP 에러 발생시 interceptor 처리
  constructor(private router: Router, public boardService: BoardService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any> = req.clone();
    return next.handle(request).pipe(catchError(err => {
      // catchError : Observable에서 error 가 발생하면 에러 처리. HTTP ERROR 도 여기에 들어간다.

      if (err.status == 401) {
        // 에러코드가 401 (인증 안됨) 처리
        if (err.error.message == 'login_failed') {
          // 로그인 실패인 경우라면 로그인실패 다이얼로그를 띄운다.
         /* alert("로그인 인증 x")*/
        }

        if (err.error.message != 'login_failed') {
          // 로그인 실패가 아니라면, 즉, 인증없이 URL 이동했다면 리다이렉트 처리
          this.redirect()
          /*alert("로그인 없이 url 이동")*/
        }
      }
      if (err.status ==403){
        alert("이용 권한이 없습니다.")
        history.back()
      }

      if (err.status ==500){
        alert("Server Error!")
      }



      return throwError(err);
    }));
  }
   public redirect(): void {
     alert('로그인이 필요한 서비스입니다..');
     this.router.navigate(['/login']);
   }

}
