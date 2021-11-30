import { Component, OnInit } from '@angular/core';
import {BoardService} from "../../service/board.service";
import {Board} from "../../model/board";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-re-comment-datail',
  templateUrl: './re-comment-datail.component.html',
  styleUrls: ['./re-comment-datail.component.scss']
})
export class ReCommentDatailComponent implements OnInit {
  boardList: any = [];
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

}
