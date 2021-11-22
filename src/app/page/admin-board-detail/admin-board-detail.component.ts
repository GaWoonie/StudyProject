import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BoardService} from "../../service/board.service";
import {Board} from "../../model/board";
import {ActivatedRoute, Router} from '@angular/router'
import {Tile} from "../../model/tile";

@Component({
  selector: 'app-admin-board-detail',
  templateUrl: './admin-board-detail.component.html',
  styleUrls: ['./admin-board-detail.component.scss']
})
export class AdminBoardDetailComponent implements OnInit {
  public boardService: BoardService;
  postIdx : number;
  board : Board | undefined;
  content : string | undefined;
  /*tiles: any=[];*/
  title : string | undefined;
  writer : string | undefined;
  writeDate : string |undefined;
  constructor(private activatedRoute : ActivatedRoute, private router:Router, boardService:BoardService,) {
  this.postIdx = this.activatedRoute.snapshot.params["idx"]
  this.boardService = boardService;}

  ngOnInit(): void {
    this.boardService.getBoard(this.postIdx).subscribe(data => {

      console.log("테스트 확인 타이틀 : "+data.title)

      this.title = data.title;
      this.board = data;
      this.content = data.content;
      this.writer = data.writer;
      this.writeDate = data.writeDate;
    });
  }
  remove(): void{
    this.boardService.deleteBoard(this.postIdx).subscribe(result =>{
      if(result == true) //버튼 눌렀을때 작동하도록 설정
        console.log("정상출력:" + this.postIdx) //콘솔로 작동확인
      alert("게시물이 삭제되었습니다")
      this.gotolist()
    })
    //idx조회를 통해, api 데이터를 delete 요청.
  }
  gotolist(): void {
    this.router.navigate(["admin/boardList"])
  }
  reload(idx: number): void {
    this.router.navigate(["admin/boardModify/",idx])
    console.log("idx 정보"+idx)
  }

}
