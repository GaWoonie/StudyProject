import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Observable, of, throwError} from 'rxjs'
import {Board, ListResponse} from "../model/board";
import { environment } from '../../environments/environment'
import {state} from "@angular/animations";
import {catchError, map, tap} from "rxjs/operators";
import {ListQuery, Sort} from "./list-query";




const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
/*
import {environment} from "../../environments/environment";

import {catchError, switchMap} from "rxjs/operators";
*/

@Injectable({
  providedIn: 'root'
})
export class BoardService {


  public BASE_URL = environment.baseUrl
  /*somethingUpdated = new Subject<string>();*/
  board: Board | undefined;


  constructor(private http: HttpClient) {
  }

/*  public getBoardList(): Observable<ListResponse> {
    return this.http.get<ListResponse>('http://localhost:8087/api/back/board/getBoardList');
  }
  // API에서 모든 게시글을 조회.*/

  public getBoardList(search_word?: any, search_option?: any): Observable<ListResponse>{

    const options = {
      params: {
        search_option: search_option ?? '',
        search_word: search_word ??''
      },
    };


    return this.http.get<ListResponse>('http://localhost:8087/api/back/board/getBoardList',options)
  }
  //word&option 으로 게시글 검색.

  public getBoardSort(order:any): Observable<ListResponse>{
    return this.http.get<ListResponse>('http://localhost:8087/api/back/board/getBoardList?&column=hit&order='+order)
  }

  public getList(query?: ListQuery) {
    const uri = environment.baseUrl + '/api/back/board/getBoardList';

    const params = {
      search_option: query?.search_option ?? '',
      search_word: query?.search_word ?? '',
      column: query?.sort_option ?? '',
      order: query?.sorting ?? '',
    }
    return this.http.get<ListResponse>(uri, { params });
  }

  public getBoard(idx: number): Observable<Board> {
    /* this.http.get<Board>('http://localhost:8087/api/back/board/getPost').subscribe( data => {})*/
    return this.http.get<Board>('http://localhost:8087/api/back/board/getPostHit/?idx=' + idx);
  }

  // API에서 상세 게시글 확인 및 조회수 증가 (idx를 통해 확인)

  public createBoard(board: Board): Observable<Board> {
    return this.http.post<Board>('http://localhost:8087/api/back/board/insertPost', board, httpOptions);
  }

  // post로 게시글 등록(생성)

  public modifyBoard(board: Board): Observable<Board> {
    return this.http.post<Board>('http://localhost:8087/api/back/board/updatePost', board)
  }

  //post로 게시글 수정

  public deleteBoard(idx: number): Observable<any> {
    return this.http.post('http://localhost:8087/api/back/board/dropPost?idx=' + idx, '')
  }

  //idx값으로 DB에서 게시글 완전 삭제


}
