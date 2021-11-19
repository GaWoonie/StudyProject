import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import {BoardService} from "../../service/board.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  /*todos$: Observable<
    {
      idx: number
  title: string
 content:string
  writer:String
  writeDate:string
  hit:number
  state:number
    }[]
    >*/

  constructor(/*private api: BoardService*/) {
    /*this.todos$ = this.api.get('/todos')
    this.todos$.subscribe(console.log) //consol 확인*/
  }

  ngOnInit(): void {}

}
