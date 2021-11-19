import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./page/main/main.component";
import {BoardListComponent} from "./page/board-list/board-list.component";
import {BoardDetailComponent} from "./page/board-detail/board-detail.component";
import {LoginComponent} from "./page/login/login.component";
import {JoinComponent} from './page/join/join.component';
import {BoardModifyComponent} from "./page/board-modify/board-modify.component";
import {BoardCreateComponent} from "./page/board-create/board-create.component";


const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'boardList',   component: BoardListComponent },
  { path: 'boardList/:idx',  component: BoardDetailComponent },
  { path: 'login', component: LoginComponent},
  { path: 'login/join', component: JoinComponent},
  { path: 'boardModify/:idx', component: BoardModifyComponent},
  { path: 'boardCreate', component: BoardCreateComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
