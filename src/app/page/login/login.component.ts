import { Component, OnInit } from '@angular/core';
import {Login} from "../../model/login";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {NavigationExtras, Router} from "@angular/router";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = new Login();
  fg_login : FormGroup;
  userService: UserService;
  authority : any =[];
  authority0 : any =[];
  authority1 : any =[];
  constructor(private fb: FormBuilder, private route:Router, userService:UserService) {
    this.fg_login = fb.group({
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
    this.login.id = this.fg_login.controls.ID.value;
    this.login.password = this.fg_login.controls.PW.value;

    this.userService.LogIn(this.login).subscribe(data=>{
      this.authority = data.authorities.length
      this.authority0 = data.authorities[0]
      this.authority1 = data.authorities[1]
      console.log("권한확인",this.authority0)
        console.log("권한확인",this.authority1)
      console.log("권한확인 배열길이",this.authority)
        let extras : NavigationExtras = {
          queryParams: {
            "authority0": this.authority0,
            "authority1" : this.authority1,
            "authority" : this.authority
          }
        }
        this.route.navigate(['/boardList'],extras);
        alert("Welcome!")
      console.log(extras)
      },

      error=>{  alert("로그인 실패!")

    })
  }

  signup(): void{
    location.href="http://localhost:4200/login/join"
  }


}
