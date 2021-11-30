import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

    userList : any =[];
    Authority : any;
  constructor(private router: Router, private userService:UserService) {
   /* this.Authority = localStorage.getItem("Authority")
    if(this.Authority == 1){
      alert("관리자 권한이 없습니다.")
      this.router.navigate(['boardList'])
    }*/
  }

  ngOnInit(): void {
  this.getalluser()
  }

  getalluser() :void{
    this.userService.All_User().subscribe(data=>{
      this.userList = data
    })
  }
  adminBoard() : void{
    this.router.navigate(['admin/boardList'])
  }

  usermodify( idx : number) : void{
    this.router.navigate(['admin/userModify/' + idx])
  }

  userboard() :void{
    location.href ="http://localhost:4200/boardList?authority0=%5Bobject%20Object%5D&authority1=%5Bobject%20Object%5D&authority=2"
  }


}
