import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {Form, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  userService : UserService;
  user = new User();
  fg_join : FormGroup;
  id_check!: boolean;
  click : boolean = false;
  doubleCheck : boolean |undefined = false;


  constructor(private router:Router, private fb:FormBuilder, userService:UserService,) {
    this.fg_join = fb.group({
      fc_id: fb.control('', [Validators.required,Validators.minLength(2),
        Validators.maxLength(10)]),
      fc_pw : new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      fc_verify_pw : new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      fc_name : new FormControl('', [Validators.required,Validators.minLength(2)])
    });


    this.userService = userService;

   /* this.fgjoin.controls.fc_id.valueChanges.subscribe(data=>{
      this.id_check= false;
    });*/
  }

  //아이디,비번 중복검사 없이 가능하도록 설정

  ngOnInit(): void {
  }

  submit_join(): void{
    this.user.id = this.fg_join.controls.fc_id.value;
    this.user.pw = this.fg_join.controls.fc_pw.value;
    this.user.name = this.fg_join.controls.fc_name.value;


    this.userService.SignUP(this.user).subscribe(response =>{

      console.log(response,"dddd")
      if(this.doubleCheck == true){
        this.router.navigate([''])
        alert("Welcome!!")
    }}, error => {
      alert("중복확인이 필요합니다.");
    })
  }

  check_id(event : MouseEvent): void{
    const {fc_id} = this.fg_join.controls;

    this.userService.Check_ID(fc_id.value).subscribe(data => {
      console.log(data, "data!")
      if (data == 1) {
        alert("중복되어 사용 할 수 없는 ID입니다.")
        this.doubleCheck = false;
      } else {
        alert("사용 가능 한 ID입니다.")
        this.click = !this.click;
        (event.target as HTMLButtonElement).disabled = true;
        this.doubleCheck = true;

        //사용 가능할 시, 중복체크 버튼 비활성화
      }

    })
    }

  check_name(event : MouseEvent): void{
    const {fc_name} = this.fg_join.controls;
    this.userService.Check_Name(fc_name.value).subscribe(response =>{
      console.log(response,"check data!!")
      if (response == 1) {
        alert("중복되어 사용 할 수 없는 NickName입니다.")
        this.doubleCheck = false;
      } else {
        alert("사용 가능 한 NickName입니다.")
        this.click = !this.click;
        (event.target as HTMLButtonElement).disabled = true;
        this.doubleCheck = true;

      }
    })
  }

}
