import { Component, OnInit } from '@angular/core';
import {Login} from "../../model/login";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = new Login();
  fglogin : FormGroup;
  userService: UserService;

  constructor(private fb: FormBuilder, private route:Router, userService:UserService) {
    this.fglogin = fb.group({
      ID : new FormControl("", [ Validators.required]),
      PW : new FormControl("",[Validators.required]),
    });

    this.userService = userService;

  }
/*  if(data.message == "login_success"){
  this.router.navigate(['/BoardList'])
}*/

  ngOnInit(): void {
  }

  submit_login() : void{
    this.login.id = this.fglogin.controls.ID.value;
    this.login.password = this.fglogin.controls.PW.value;

    this.userService.LogIn(this.login).subscribe(data=>{
      if(data.message == "login_success") {
        this.route.navigate(['/boardList']);
        alert("Welcome!")
      }
      else {
        alert("로그인 실패!")
      }
    })
  }
  loginpage(): void{
    location.href="http://localhost:4200/boardList"
  }
  signup(): void{
    location.href="http://localhost:4200/login/join"
  }


}
