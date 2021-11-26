import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./page/main/main.component";
import {BoardListComponent} from "./page/board-list/board-list.component";
import {BoardDetailComponent} from "./page/board-detail/board-detail.component";
import {LoginComponent} from "./page/login/login.component";
import {JoinComponent} from './page/join/join.component';
import {BoardModifyComponent} from "./page/board-modify/board-modify.component";
import {BoardCreateComponent} from "./page/board-create/board-create.component";
import {AdminBoardListComponent} from "./page/admin-board-list/admin-board-list.component";
import {AdminUserListComponent} from "./page/admin-user-list/admin-user-list.component";
import {AdminBoardDetailComponent} from "./page/admin-board-detail/admin-board-detail.component";
import {AdminBoardModifyComponent} from "./page/admin-board-modify/admin-board-modify.component";
import {AdminUserModifyComponent} from "./page/admin-user-modify/admin-user-modify.component";
import {CommentCreateComponent} from "./page/comment-create/comment-create.component";
import {CommentDetailComponent} from "./page/comment-detail/comment-detail.component";
import {StatisticsComponent} from "./page/statistics/statistics.component";
import {ErrorInterceptor} from "./common/error-interceptor";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'boardList',   component: BoardListComponent,},
  { path: 'boardList/:idx',  component: BoardDetailComponent },
  { path: 'login/join', component: JoinComponent},
  { path: 'boardModify/:idx', component: BoardModifyComponent},
  { path: 'boardCreate', component: BoardCreateComponent},
  { path: 'admin/boardList', component: AdminBoardListComponent},
  { path: 'admin/userList', component: AdminUserListComponent},
  { path: 'admin/boardList/:idx', component: AdminBoardDetailComponent},
  { path: 'admin/boardModify/:idx', component: AdminBoardModifyComponent},
  { path: 'admin/userModify/:idx', component: AdminUserModifyComponent},
  { path: 'comment/:idx', component: CommentDetailComponent},
  { path: 'write/comment/:idx', component: CommentCreateComponent},
  { path: 'statistics', component: StatisticsComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
