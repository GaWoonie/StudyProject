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

  constructor(private router: Router, private userService:UserService) {

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
    this.router.navigate(["/boardList"])
  }


}
