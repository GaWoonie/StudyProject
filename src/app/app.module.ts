import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardListComponent } from './page/board-list/board-list.component';
import { BoardDetailComponent } from './page/board-detail/board-detail.component';
import { MainComponent } from './page/main/main.component';
import {TokenInterceptorService} from "./common/token-interceptor.service";
import { LoginComponent } from './page/login/login.component';
import { JoinComponent } from './page/join/join.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { environment } from '../environments/environment';
import { BoardModifyComponent } from './page/board-modify/board-modify.component';
import { BoardCreateComponent } from './page/board-create/board-create.component';

/*import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
* */


//공통적으로 사용 할 Component, Module, Service 등록 설정파일
@NgModule({
  declarations: [
    AppComponent,
    BoardListComponent,
    BoardDetailComponent,
    MainComponent,
    LoginComponent,
    JoinComponent,
    BoardModifyComponent,
    BoardCreateComponent,


  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule



/*// HttpClientInMemoryWebApiModule 모듈은 HTTP 요청을 가로채고 서버의 응답을 흉내냅니다.
// 실제 서버가 준비되면 이 부분을 제거하면 됩니다.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )*/
    /*HttpClientModule,*/
  ],
  providers: [
    //공통적으로 사용 할 servicce 등록하는 곳

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }


  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
