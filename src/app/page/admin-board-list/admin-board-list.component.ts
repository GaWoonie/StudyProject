import { Component, OnInit } from '@angular/core';
import {BoardService} from "../../service/board.service";
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Board, ListResponse} from "../../model/board";
import {BoardDetailComponent} from "../board-detail/board-detail.component";
import {UserService} from "../../service/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListQuery} from "../../service/list-query";

@Component({
  selector: 'app-admin-board-list',
  templateUrl: './admin-board-list.component.html',
  styleUrls: ['./admin-board-list.component.scss']
})
export class AdminBoardListComponent implements OnInit {
  boardList: any = [];
  boardHit: number | undefined;
  userService: UserService;
  /* search_option : string;
   search_word : string;*/
  fgSearch: FormGroup;
  fc_search_option: any;
  fc_search_word: string = '';
  fgHit: FormGroup;
  fc_hit_up: any;
  fc_hit_down: any;
  postIdx: number;
  Authority : any;

  constructor(private boardService: BoardService,
              private router: Router,
              private route: ActivatedRoute,
              userService: UserService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
    this.Authority = localStorage.getItem("Authority")
    if(this.Authority == 1){
      alert("관리자 권한이 없습니다.")
      history.back()
    }
    this.userService = userService;
    this.boardService = boardService;
    this.postIdx = this.activatedRoute.snapshot.params["idx"]
    this.fgSearch = fb.group({
      search_option: new FormControl('wirter,title,content', [Validators.required]),
      search_word: new FormControl('')
    })
    //option,word 입력될 formgroup 생성
    this.fgSearch.valueChanges.subscribe(data => {
      this.fc_search_option = data.search_option;
      this.fc_search_word = data.search_word;
      this.reload();
    })
    //바뀐 입력 내용을 해당 formControl에 입력
    this.fgHit = fb.group({
      order: new FormControl('desc', [Validators.required])
    })
    //hit별 오름/내림차순 정렬
    this.fgHit.valueChanges.subscribe(data => {
      this.fc_hit_up = data.order;
      this.fc_hit_down = data.order;
      this.reload();
    })

  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.fgSearch.patchValue({
      search_option: queryParams.search_option,
      search_word: queryParams.search_word
    })

    this.reload();
  }

  private reload() {
    const query: ListQuery = {
      search_option: this.fgSearch.value.search_option,
      search_word: this.fgSearch.value.search_word,
      sort_option: 'group_hit',
      sorting: this.fgHit.value.order,
    };

    this.boardService.getList(query).subscribe(data => {
      this.boardList = data.items;
    });
  }
  //option,word 적용하여 페이지 reload.

  godetail(idx: number, hit: number): void {
    console.log("클릭한 행의 idx : " + idx)
    console.log("클릭한 행의 hit :" + hit) //consol에 클릭한 행의 hit 출력되게 함
    this.router.navigate(["admin/boardList/", idx])
  }

  //idx 값을 가져와 /뒤에 입력해 줌, idx값에 따라 detail화면 출력.
  remove(): void {
    this.boardService.deleteBoard(this.postIdx).subscribe(result => {
      if (result == true) //버튼 눌렀을때 작동하도록 설정
        console.log("정상출력:" + this.postIdx) //콘솔로 작동확인
      alert("게시물이 삭제되었습니다")
      this.adminboard()
    })
  }

  adminboard(): void {
    this.router.navigate(["admin/boardList"])
  }

  adminuser(): void{
    this.router.navigate(["admin/userList"])
  }

  userboard() :void{
    location.href ="http://localhost:4200/boardList?authority0=%5Bobject%20Object%5D&authority1=%5Bobject%20Object%5D&authority=2"
  }

  gotostatistics() : void{
    this.router.navigate(['statistics'])
  }

 }
