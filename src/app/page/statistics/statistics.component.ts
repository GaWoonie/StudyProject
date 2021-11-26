import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  clickDate : boolean |undefined = false;
  clickWeek : boolean |undefined = false;
  clickMonth : boolean |undefined = false;
  Date : FormGroup;
  Week : FormGroup;
  Month : FormGroup;
  Click_Day : FormGroup;
  Click_Week1 : FormGroup;
  Click_Week2 : FormGroup;
  Click_Month : FormGroup;
  click_day : boolean |undefined =false;
  click_week : boolean |undefined =false;
  click_month : boolean |undefined =false;


  constructor(  private router: Router,  private fb: FormBuilder,) {
  this.Date = this.fb.group({
    date : new FormControl('',[Validators.required])
  })
  this.Week = this.fb.group({
    week : new FormControl('',[Validators.required])
  })
  this.Month = this.fb.group({
    month : new FormControl('',[Validators.required])
  })
  this.Click_Day = this.fb.group({
    year : new FormControl('',[Validators.required]),
    month : new FormControl('',[Validators.required]),
    day : new FormControl('',[Validators.required])
  })
    this.Click_Week1 = this.fb.group({
      year : new FormControl('',[Validators.required]),
      month : new FormControl('',[Validators.required]),
      day : new FormControl('',[Validators.required])
    })
    this.Click_Week2 = this.fb.group({
      year : new FormControl('',[Validators.required]),
      month : new FormControl('',[Validators.required]),
      day : new FormControl('',[Validators.required])
    })
    this.Click_Month = this.fb.group({
      year : new FormControl('',[Validators.required]),
      month : new FormControl('',[Validators.required]),
    })

  }


  ngOnInit(): void {
  }


  Click_day() : void{
    this.click_day = true;
    this.click_week = false;
    this.click_month = false;
    console.log(this.Click_Day.value)
  }

  Click_week() : void{
    this.click_week = true;
    this.click_day = false;
    this.click_month = false;
    console.log(this.Click_Week1.value)
    console.log(this.Click_Week2.value)
  }

  Click_month() : void {
    this.click_month = true;
    this.click_day = false;
    this.click_week = false;
    console.log(this.Click_Month.value)
  }


  //아래부터 기존 날짜 입력 코드
  click_Date() : void {
    this.clickDate = true;
    this.clickWeek = false;
    this.clickMonth = false;
  }

  submit_Date() : void {
    console.log(this.Date.value.date)
  }

  submit_Week() : void {
    console.log(this.Week.value.week)
  }

  submit_Month() : void {
    console.log(this.Month.value.month)
  }

  click_Week() : void {
    this.clickWeek = true;
    this.clickMonth = false;
    this.clickDate = false;
  }

  click_Month() : void {
    this.clickMonth = true
    this.clickDate = false;
    this.clickWeek = false;
  }

  adminBoard() :void {
    this.router.navigate(['admin/boardList'])
  }
  userBoard() : void {
    this.router.navigate(['boardList'])
  }
}
