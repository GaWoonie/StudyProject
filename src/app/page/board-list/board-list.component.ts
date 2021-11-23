import { Component, OnInit } from '@angular/core';
import {BoardService} from "../../service/board.service";
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../service/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListQuery} from "../../service/list-query";




@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})

/* * pageIndex: 현재 페이지 인덱스 1,2,3,,,
 * pageSize: 한 페이지에 보여지는 갯수
 * totalCount: 뉴스의 총갯수
 * pageSizeOptions: 한페이지에 보여지는 갯수를 조정하는 옵션*/



export class BoardListComponent implements OnInit {

  boardList: any = [];
  boardHit: number | undefined;
  userService: UserService;
 /* search_option : string;
  search_word : string;*/
  fgSearch : FormGroup;
  fc_search_option : any;
  fc_search_word : string = '';
  fgHit : FormGroup;
  fc_hit_up : any;
  fc_hit_down : any;
  /*fgIdx :FormGroup;
  fc_idx_up : any;
  fx_idx_down : any;
*/



  flag_search = false;

  // 게시글 받을 배열
  /*
    pageIndex : number = 1;
    private pageSize: number | undefined;
    private totalPage: number | undefined;
    listTotalCount : any;
  */

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    userService:UserService,
    private fb:FormBuilder) {

    this.userService = userService
    this.fgSearch =fb.group({
      search_option :new FormControl('wirter,title,content',[Validators.required]),
      search_word : new FormControl('')
    })
    //option,word 입력될 formgroup 생성
    this.fgSearch.valueChanges.subscribe(data=>{
      this.fc_search_option = data.search_option;
      this.fc_search_word = data.search_word;
      this.reload();
    })
    //바뀐 입력 내용을 해당 formControl에 입력
    this.fgHit = fb.group({
      order : new FormControl('desc',[Validators.required])
    })
    //hit별 오름/내림차순 정렬
    this.fgHit.valueChanges.subscribe(data=>{
      this.fc_hit_up = data.order;
      this.fc_hit_down = data.order;
      this.reload();
    })
  /*  this.fgIdx = fb.group({
      order : new FormControl('desc',[Validators.required])
    })
    //idx별 오름/내림차순 정렬
    this.fgIdx.valueChanges.subscribe(data=>{
      this.fc_idx_up = data.order;
      this.fx_idx_down = data.order;
    })*/


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
      sort_option: 'hit',
      sorting: this.fgHit.value.order,
    };

    this.boardService.getList(query).subscribe(data => {
      console.log(data, "this.boardList data")
      this.boardList = data.items;
      console.log(this.boardList, "this.boardList")
    });
  }
  gotoadmin() :void{
    this.router.navigate(['admin/boardList'])
  }
  //권한관리 설정 해야함

  searchboard(search_option: string, search_word: string): void{
    this.boardService.getBoardList(this.fc_search_word,this.fc_search_option).subscribe(data=>{
      this.boardList = data.items;
      this.router.navigate(['boardList'],{queryParams:{search_option : this.fc_search_option, search_word : this.fc_search_word}})
    })
  }
  //option,word 적용하여 페이지 reload.

  boardhit(hit: number): void {
    console.log("클릭한 행의 hit :" + hit)
  }

  godetail(idx: number, hit: number): void {
    console.log("클릭한 행의 idx : " + idx)
    console.log("클릭한 행의 hit :" + hit) //consol에 클릭한 행의 hit 출력되게 함
    this.router.navigate(["boardList/", idx])
  }

  //idx 값을 가져와 /뒤에 입력해 줌, idx값에 따라 detail화면 출력.

  write(): void {
    this.router.navigate(["boardCreate"])
  }

  //내림차순 정렬

  logout(): void{
    this.userService.LogOut().subscribe(data =>
      this.router.navigate([''])
    )
  }
  //로그아웃시킴

}
//create form으로 이동(navigate)

  /*  requestpage(pageIndex: any) : void{
    this.pageSize = 10;
    this.totalPage = 10*(pageIndex-1);


    this.boardService.getBoardList(this.pageSize, this.totalPage).subscribe(
      data =>{
        this.boardList = data.items;
      this.listTotalCount = data.total;

    })
    }*/

    /*movePage(page: any) : void{
    this.pageIndex = page;
    this.requestpage(page);
    this.router.navigate(['/boardList'],{queryParams:{page:this.pageIndex }})
    }
    //페이지 이동 시, 데이터 출력*/

