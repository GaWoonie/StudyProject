import { Component, OnInit } from '@angular/core';
import {getLocaleDateTimeFormat} from "@angular/common";
import {ActivatedRoute, Router} from '@angular/router'
import {BoardService} from "../../service/board.service";
import {Board} from "../../model/board";
import {Observable} from "rxjs";
import {FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule,FormsModule} from "@angular/forms";



@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.scss']
})
export class BoardCreateComponent implements OnInit {
  boardService: BoardService;
  board : Board | undefined;
  createform : FormGroup;



  today = new Date();
  year = this.today.getFullYear(); // 년도
  month = this.today.getMonth() + 1;  // 월
  date = this.today.getDate();  // 날짜
 /* day = this.today.getDay();  // 요일 (0~6으로 표현됨)*/
  hours = this.today.getHours(); // 시
  minutes = this.today.getMinutes();  // 분
  seconds = this.today.getSeconds();  // 초


  constructor( private fb: FormBuilder, private router:Router, boardService:BoardService )  {
    this.boardService = boardService;
    this.createform = this.fb.group({
        title:new FormControl('' ,[Validators.required]),
        content:new FormControl('',[Validators.required]),
      })
  }

  ngOnInit(): void {



  }
  submit() : void {
    this.boardService.createBoard(this.createform.value).subscribe(data => {
      console.log("정상출력:" + this.createform)
      this.reload()
      })
    //입력된 title, content, writer 데이터를 api 에 update 요청.
  }

  reload() : void{
    this.router.navigate(['/boardList'])
  }
//완료 버튼 누르면 리스트화면으로 reload됨.


  buttonclick() {
    location.href = 'http://localhost:4200/boardList'
  }
 /* submit() : void {
    this.boardService.createBoard(this.boardList).subscribe(data => {
      this.reload();
      console.log("이거맞나"+data)
    })
    //입력된 title, content, idx 데이터를 가지고 api 에 update 요청을 한다. http 통신이 완료되면 reloard_BoardList() : 게시글 리스트 화면으로 이동된다.
  }
  reload() : void {
    this.router.navigate(['/BoardList'])
  }*/
}


