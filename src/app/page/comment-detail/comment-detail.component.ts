import { Component, OnInit } from '@angular/core';
import {Add_Comment, Board} from "../../model/board";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
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
  group_Depth : number;


  constructor(private activatedRoute : ActivatedRoute, private router:Router, boardService:BoardService) {
    this.postIdx = this.activatedRoute.snapshot.params["idx"]
    this.group_Depth = this.activatedRoute.snapshot.params["group_depth"]
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
      this.group_Depth = data.group_depth;
      console.log("조회한 게시글의 group_depth :" + data.group_depth)
      console.log("게시글의 그룹뎁쓰 :" + this.group_Depth)
    });
  }

  writeReply(idx : number, group_depth : number) : void {
    let extras : NavigationExtras = {
      queryParams: {
        "idx" : idx,
        "group_depth" : group_depth
      }
    }
    this.router.navigate(['write/comment/',this.postIdx],extras)
    console.log(group_depth)
  }

  }
