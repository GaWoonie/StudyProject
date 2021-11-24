import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BoardService} from "../../service/board.service";
import {Add_Comment, Board, Comments} from "../../model/board";
import {ActivatedRoute, Router} from '@angular/router'
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListQuery} from "../../service/list-query";



@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})

export class BoardDetailComponent implements OnInit {

  public boardService: BoardService;
  postIdx : number;
  board : Board | undefined;
  content : string | undefined;
  /*tiles: any=[];*/
  title : string | undefined;
  writer : string | undefined;
  writeDate : string |undefined;
  commentList: any =[];
  comment : string |undefined;
  idxComment: number |undefined;
  depth : number |undefined;
  CommentForm : FormGroup;
  ReplyCommentForm : FormGroup;
  replybutton: boolean |undefined = false;
  parentidx : number |undefined;



  constructor(private activatedRoute : ActivatedRoute, private router:Router, boardService:BoardService,private fb:FormBuilder) {
    this.postIdx = this.activatedRoute.snapshot.params["idx"]
    this.boardService = boardService;
    this.CommentForm = this.fb.group({
      parentIdx : new FormControl('',[Validators.required]),
      depth : new FormControl('0', [Validators.required]),
      comment : new FormControl('', [Validators.required]),
      postidx : this.postIdx
    })
    this.ReplyCommentForm = this.fb.group({
      parentIdx : this.commentList.parentidx,
      depth : new FormControl('1',[Validators.required]),
      comment : new FormControl('',[Validators.required]),
      postidx : this.postIdx
    })

  }
  //depth 값 1로 지정할 수 있도록 수정 해야함.



  ngOnInit(): void {
    this.boardService.getBoard(this.postIdx).subscribe(data => {

      console.log("테스트 확인 타이틀 : "+data.title)

      this.title = data.title;
      this.board = data;
      this.content = data.content;
      this.writer = data.writer;
      this.writeDate = data.writeDate;
    });

    this.boardService.getComment(this.postIdx).subscribe(data=>{
      this.idxComment = data.idxComments;
      this.depth = data.depth;
      this.commentList = data;
      this.comment = data.comment;
      this.parentidx = data.parentIdx;
           console.log("parentidx 번호 : " + data.depth)
    })
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
    this.router.navigate(["boardList"])
  }

  gotoModify(idx: number): void {
    this.router.navigate(["boardModify/",idx])
    console.log("idx 정보"+idx)
  }

  addcomment(): void{
    this.boardService.addComment(this.CommentForm.value).subscribe(data=>{
      console.log("댓글 등록" + this.comment)
      this.commentReload()

    })
  }
  commentReload(): void{
    location.reload();
  }

  replyComment(): void{
    const query: Add_Comment = {
      comment : this.ReplyCommentForm.value.comment,
      depth : 1,
      parentIdx : this.ReplyCommentForm.value.parentIdx,
      postidx : this.ReplyCommentForm.value.postidx
    };
    this.boardService.ReplyComment(query).subscribe(data=>{
      this.commentReload()
    })
  }

  Reply() {
    if(this.parentidx==this.commentList.parentIdx){
    this.replybutton = true;
    }
    console.log("클릭한 행의 parentidx :" + this.parentidx)
  }
}




