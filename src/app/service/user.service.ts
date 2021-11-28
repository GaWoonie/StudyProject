import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {Login} from "../model/login";
import {LoginComponent} from "../page/login/login.component";
import {JoinComponent} from "../page/join/join.component";
import {environment} from "../../environments/environment";
import {Board} from "../model/board";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: User | undefined;

  constructor(private httpClient : HttpClient) { }

  SignUP(user:User): Observable<any>{
    return this.httpClient.post('api/api/back/user/insertUser',user)
  }

  LogIn(login:Login): Observable<any>{
    return this.httpClient.post<any>('api/api/back/user/login',login)
  }

  LogOut(): Observable<any>{
    return this.httpClient.get('api/api/back/user/logout')
  }

  Check_ID(id:string): Observable<any>{
    return this.httpClient.get('api/api/back/user/existsId?id='+id)
  }
  //아이디 중복확인
  Check_Name(name:string): Observable<any>{
    return this.httpClient.get('api/api/back/user/existsName?name='+name)
  }
  //이름 중복확인

  All_User() : Observable<User>{
    return this.httpClient.get<User>('api/api/back/user/selectUserList')
  }
  //모든 유저 정보 조회

  Select_User(idx:number) : Observable<User>{
    return this.httpClient.get<User>('api/api/back/user/selectUser?idx='+idx)
  }
  //유저 정보 조회

  Modify_User(user: User) : Observable<User>{
    console.log("user 네임 : "+user.name)
    console.log(" 비밀번호 : " + user.password)
    return this.httpClient.put<User>('api/api/back/user/updateUser', user)
  }
  //유저 정보 (id,pw,name) 수정. idx값으로 유저 정보 조회

  Delete_User(idx:number) : Observable<User>{
    // @ts-ignore
    return this.httpClient.put('api/api/back/user/deleteUser?idx=' + idx,'')
  }
}
