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
    return this.httpClient.post('http://localhost:8087/api/back/user/insertUser',user)
  }

  LogIn(login:Login): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8087/api/back/user/login',login)
  }

  LogOut(): Observable<any>{
    return this.httpClient.get('http://localhost:8087/api/back/user/logout')
  }

  Check_ID(id:string): Observable<any>{
    return this.httpClient.get('http://localhost:8087/api/back/user/existsId?id='+id)
  }
  //아이디 중복확인
  Check_Name(name:string): Observable<any>{
    return this.httpClient.get('http://localhost:8087/api/back/user/existsName?name='+name)
  }
  //이름 중복확인

  GetUser(): Observable<User>{
    return this.httpClient.get<User>('localhost:8087/api/back/user/getUser')
  }
}
