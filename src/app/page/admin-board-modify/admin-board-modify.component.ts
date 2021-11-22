import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardService} from "../../service/board.service";
import {Board} from "../../model/board";

@Component({
  selector: 'app-admin-board-modify',
  templateUrl: './admin-board-modify.component.html',
  styleUrls: ['./admin-board-modify.component.scss']
})
export class AdminBoardModifyComponent implements OnInit {
  modifyform : FormGroup;
  boardService: BoardService;
  postIdx: number;
  board: Board | undefined;
  content: string | undefined;
  tiles: any = [];
  title: string | undefined;
  writer: string | undefined;
  writeDate: string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, boardService: BoardService, private fb: FormBuilder) {
    this.postIdx = this.activatedRoute.snapshot.params["idx"]
    this.boardService = boardService;
    this.modifyform = this.fb.group({
      title:new FormControl('' ,[Validators.required]),
      content:new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {


    this.boardService.getBoard(this.postIdx).subscribe(data => {

      console.log("테스트 확인 타이틀 : " + data.title)

      this.title = data.title;
      this.board = data;
      this.content = data.content;
      this.writer = data.writer;
      this.writeDate = data.writeDate;
    });
  }

  //detail과 동일 한 방법으로 api 출력

  modify() : void {
    this.modifyform.value.idx = this.postIdx
    // form contorl 의 입력된 { 제목, 내용 } 에 + 게시글의 idx 값도 추가한다.
    this.boardService.modifyBoard(this.modifyform.value).subscribe(data => {
      console.log("정상출력:" + this.modifyform)
      this.reload()
    })
    //입력된 title, content, 데이터를 api 에 update 요청. writer,idx는 변경불가.
  }

  reload() : void{
    this.router.navigate(['admin/boardList'])
  }


  buttonclick() : void {
    this.router.navigate(["admin/boardList"])
  }

}
