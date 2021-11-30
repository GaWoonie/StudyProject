import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BoardService} from "../../service/board.service";
import {Add_Comment, Board, Comments} from "../../model/board";
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router'
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListQuery} from "../../service/list-query";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";



@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})

export class BoardDetailComponent implements OnInit {

  add_commnet : Add_Comment | undefined;

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
  parentidx : number =0 ;
  clicked_idx : number = 0;
  deleteButton : boolean |undefined = false;
  modify_enabled: boolean |undefined;
  delete_enabled: boolean |undefined;
  group_Depth : number;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router:Router,
    boardService:BoardService,
    private fb:FormBuilder,) {
    this.postIdx = this.activatedRoute.snapshot.params["idx"]
    this.group_Depth = this.activatedRoute.snapshot.params["group_depth"]
    this.boardService = boardService;
    this.CommentForm = this.fb.group({
      parentIdx : new FormControl('',[Validators.required]),
      depth : new FormControl('0', [Validators.required]),
      comment : new FormControl('', [Validators.required]),
      postidx : this.postIdx
    })
    this.ReplyCommentForm = this.fb.group({
      parentIdx : this.parentidx,
      depth : 1,
      comment : new FormControl('',[Validators.required]),
      postidx : this.postIdx
    })

  }
  //depth 값 1로 지정할 수 있도록 수정 해야함.



  ngOnInit(): void {
    this.boardService.getBoard(this.postIdx).subscribe(data => {

      console.log("테스트 확인 수정가능 : "+data.modify_enabled)

      this.title = data.title;
      this.board = data;
      this.content = data.content;
      this.writer = data.writer;
      this.writeDate = data.writeDate;
      this.modify_enabled = data.modify_enabled;
      this.delete_enabled = data.delete_enabled;
      this.group_Depth = data.group_depth;
      console.log("조회한 게시글의 group_depth :" + data.group_depth)
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

    console.log("parentIdx : "+this.clicked_idx+"  comment : "+this.ReplyCommentForm.value.comment+ " depth : "+1+" postIdx : "+this.ReplyCommentForm.value.postidx)

    // @ts-ignore
    this.boardService.ReplyComment(this.ReplyCommentForm).subscribe(data=>{
      console.log("답글등록"  +this.ReplyCommentForm.value)
      /*this.commentReload()*/
    })
  }

  Reply(idxComment : number) {
    this.clicked_idx = idxComment;

    if(this.parentidx==this.commentList.parentIdx){
    this.replybutton = true;
    }
  }

  contents(parentidx : number){
    console.log("patentidx 확인 :" + parentidx)
  }

  gotocomment(idx : number, group_depth : number) :void{
    this.postIdx = idx
    let extras : NavigationExtras = {
      queryParams: {
        "idx" : idx,
        "group_depth" : group_depth + 1,
      }
    }
    console.log("그룹 뎁쓰 : ", extras);
    this.router.navigate(['write/comment/',idx],extras)
  }
}




