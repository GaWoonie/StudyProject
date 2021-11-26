import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardListComponent } from './page/board-list/board-list.component';
import { BoardDetailComponent } from './page/board-detail/board-detail.component';
import { MainComponent } from './page/main/main.component';
import { LoginComponent } from './page/login/login.component';
import { JoinComponent } from './page/join/join.component';
import {HTTP_INTERCEPTORS, HttpClientModule, JsonpInterceptor} from '@angular/common/http';
import {CommonModule,} from "@angular/common";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { BoardModifyComponent } from './page/board-modify/board-modify.component';
import { BoardCreateComponent } from './page/board-create/board-create.component';
import { AdminBoardListComponent } from './page/admin-board-list/admin-board-list.component';
import { AdminUserListComponent } from './page/admin-user-list/admin-user-list.component';
import { AdminBoardDetailComponent } from './page/admin-board-detail/admin-board-detail.component';
import { AdminBoardModifyComponent } from './page/admin-board-modify/admin-board-modify.component';
import { AdminUserModifyComponent } from './page/admin-user-modify/admin-user-modify.component';
import {TokenInterceptorService} from "./common/token-interceptor.service";
import {ErrorInterceptor} from "./common/error-interceptor";
import { CommentCreateComponent } from './page/comment-create/comment-create.component';
import { CommentDetailComponent } from './page/comment-detail/comment-detail.component';
import { StatisticsComponent } from './page/statistics/statistics.component';
import {Chart} from "chart.js";


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
    AdminBoardListComponent,
    AdminUserListComponent,
    AdminBoardDetailComponent,
    AdminBoardModifyComponent,
    AdminUserModifyComponent,
    CommentCreateComponent,
    CommentDetailComponent,
    StatisticsComponent,



  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [
    //공통적으로 사용 할 service 등록하는 곳
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,    /*TokenInterceptorService,*/
      multi: true
    }

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
