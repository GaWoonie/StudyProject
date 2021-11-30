import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  Authority : any;

  constructor(private router:Router) {



  }

  ngOnInit(): void {
       /* throw new Error('Method not implemented.');*/
    }

  ConfirmAdmin() : void {
    this.Authority = localStorage.getItem("Authority")

    if(this.Authority == 1){
      alert("관리자 권한이 없습니다.")
      this.router.navigate(['boardList'])
    }}
    // 관리자 권한이 있는지 없는지 확인하는 방법
  }





