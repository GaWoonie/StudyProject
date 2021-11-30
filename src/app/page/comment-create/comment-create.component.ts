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
  replyForm : FormGroup;

  constructor(private activatedRoute : ActivatedRoute, private router:Router, boardService:BoardService,private fb:FormBuilder) {
  this.boardService = boardService;
  this.postIdx = this.activatedRoute.snapshot.params["idx"]
  this.groupIdx = this.activatedRoute.snapshot.params["group_idx"]
  /*this.group_Depth = this.activatedRoute.snapshot.params["group_depth"]*/
  // @ts-ignore
    this.group_Depth =this.activatedRoute.snapshot.queryParamMap.get("group_depth")


  console.log('@@@@@@@@@@',this.group_Depth);
  this.replyForm = this.fb.group({
    group_idx : this.postIdx,
    title :  new FormControl('',[Validators.required]),
    content : new FormControl('',[Validators.required]),
  })
  }

  ngOnInit(): void {
    // this.depth()
    /*if(this.board?.group_depth==1){
      this.reply1 = false;
      this.reply2 = true;
    } else {
      this.reply1 = true;
      this.reply2 = false;
    }*/
  }


  submitReply1() : void {
    this.boardService.createBoard(this.replyForm.value).subscribe(data => {
      console.log("정상출력:" + this.groupIdx)})
     this.reload()
    }
    //입력된 title, content, writer 데이터를 api 에 update 요청.

  reload() : void{
    this.router.navigate([history.go(-1)])
  }
//완료 버튼 누르면 리스트화면으로 reload됨.

}
