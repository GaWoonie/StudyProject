import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {



  constructor(private router: Router,) {

  }

  ngOnInit(): void {

  }


  adminBoard() : void{
    this.router.navigate(['admin/boardList'])
  }

  usermodify() : void{
    this.router.navigate(['admin/userModify/:idx'])
  }

  userboard() :void{
    this.router.navigate([''])
  }
}
