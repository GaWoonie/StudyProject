import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BoardService} from "../../service/board.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Board} from "../../model/board";

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {
  today = new Date();
  year = this.today.getFullYear(); // 년도
  month = this.today.getMonth() + 1;  // 월
  date = this.today.getDate();  // 날짜
  /* day = this.today.getDay();  // 요일 (0~6으로 표현됨)*/
  hours = this.today.getHours(); // 시
  minutes = this.today.getMinutes();  // 분
  seconds = this.today.getSeconds();  // 초

  boardService: BoardService;
  board : Board | undefined;
  postIdx : number;
  groupIdx : number;
  group_Depth : number;
  replyForm1 : FormGroup;
  replyForm2 : FormGroup;
  reply1 : boolean |undefined = true;
  reply2 : boolean |undefined = false;

  constructor(private activatedRoute : ActivatedRoute, private router:Router, boardService:BoardService,private fb:FormBuilder) {
  this.boardService = boardService;
  this.postIdx = this.activatedRoute.snapshot.params["idx"]
  this.groupIdx = this.activatedRoute.snapshot.params["group_idx"]
  this.group_Depth = this.activatedRoute.snapshot.params["group_depth"]




  this.replyForm1 = this.fb.group({
    group_idx : this.postIdx,
    group_depth : this.group_Depth +1,
    writer : new FormControl('',[Validators.required]),
    title :  new FormControl('',[Validators.required]),
    content : new FormControl('',[Validators.required]),
  })
  this.replyForm2 = this.fb.group({
    group_idx : this.groupIdx,
    group_depth : 2,
    writer : new FormControl('',[Validators.required]),
    title :  new FormControl('',[Validators.required]),
    content : new FormControl('',[Validators.required]),
  })
  }

  ngOnInit(): void {
    this.depth()
    /*if(this.board?.group_depth==1){
      this.reply1 = false;
      this.reply2 = true;
    } else {
      this.reply1 = true;
      this.reply2 = false;
    }*/
  }


  submitReply1() : void {
    this.boardService.createBoard(this.replyForm1.value).subscribe(data => {
      console.log("정상출력:" + this.groupIdx)})
    console.log("dㅔ에베베베" + this.replyForm1.value)
    this.reload()
    }
    //입력된 title, content, writer 데이터를 api 에 update 요청.
  submitReply2() : void {
    this.boardService.createBoard(this.replyForm2.value).subscribe(data => {
      console.log("정상출력:" + this.replyForm2.value)})

  }

  reload() : void{
    this.router.navigate([history.go(-1)])
  }
//완료 버튼 누르면 리스트화면으로 reload됨.

  depth() : void {
    this.boardService.getBoard(this.postIdx).subscribe(data => {
      this.group_Depth = data.group_depth;
      console.log("조회한 게시글의 group_depth :" + data.group_depth)

    });
  }
}
