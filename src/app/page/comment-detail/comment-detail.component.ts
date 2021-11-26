import { Component, OnInit } from '@angular/core';
import {Add_Comment, Board} from "../../model/board";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardService} from "../../service/board.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.scss']
})
export class CommentDetailComponent implements OnInit {
  add_commnet : Add_Comment | undefined;

  public boardService: BoardService;
  postIdx : number;
  board : Board | undefined;
  content : string | undefined;
  title : string | undefined;
  writer : string | undefined;
  writeDate : string |undefined;
  comment : string |undefined;



  constructor(private activatedRoute : ActivatedRoute, private router:Router, boardService:BoardService) {
    this.postIdx = this.activatedRoute.snapshot.params["idx"]
    this.boardService = boardService;


  }
  //depth 값 1로 지정할 수 있도록 수정 해야함.



  ngOnInit(): void {
    this.boardService.getBoard(this.postIdx).subscribe(data => {

      console.log("테스트 확인 타이틀 : "+data.idx)

      this.title = data.title;
      this.board = data;
      this.content = data.content;
      this.writer = data.writer;
      this.writeDate = data.writeDate;
    });
  }

  writeReply() : void {
    this.router.navigate(['write/comment/',this.postIdx])
  }

  }
