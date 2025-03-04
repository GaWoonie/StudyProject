import {Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Chart, registerables, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale} from 'chart.js';
import {DateQuery, ListQuery} from "../../service/list-query";
import {BoardService} from "../../service/board.service";
Chart.register(...registerables);
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  boardList: any = [];

  clickDate : boolean |undefined = false;
  clickWeek : boolean |undefined = false;
  clickMonth : boolean |undefined = false;
/*  Date : FormGroup;
  Week : FormGroup;
  Month : FormGroup;*/
  Click_Day : FormGroup;
  Click_Week1 : FormGroup;
  Click_Week2 : FormGroup;
  Click_Month : FormGroup;
  monthDate : any;
  click_day : boolean |undefined =false;
  click_week : boolean |undefined =false;
  click_month : boolean |undefined =false;
  count : number | undefined;
  ctx : any;
  mychart : Chart |undefined;


  constructor(  private router: Router,  private fb: FormBuilder, private boardService: BoardService,) {

  /*this.Date = this.fb.group({
    date : new FormControl('',[Validators.required])
  })
  this.Week = this.fb.group({
    week : new FormControl('',[Validators.required])
  })
  this.Month = this.fb.group({
    month : new FormControl('',[Validators.required])
  })*/
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
    this.chart()
  }

  chart() : void {
    const ctx = document.getElementById('myChart');
    // @ts-ignore
    const mychart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],  //x축
        datasets: [{
          label: '# of Count',
          data: [12, 19, 3, 5, 2, 3],   //y축
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 0.5
        }]
      },
      options: {
        responsive : false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  //차트 만들기



  private reloadByDay() {
    // @ts-ignore
    const query: DateQuery = {
      request : 'daily',
      offset_date : this.Click_Day.value.year +'-' +this.Click_Day.value.month + '-' +this.Click_Day.value.day,
    }
    this.boardService.getBoardByDate(query).subscribe(data=>{
      this.boardList = data.boardList;
      this.count = data.count;
    })
  }

  private reloadByWeek() {
    // @ts-ignore
    const query: DateQuery = {
      request : 'weekly',
      offset_date : this.Click_Week1.value.year +'-' +this.Click_Week1.value.month + '-' +this.Click_Week1.value.day,
      limit_date : this.Click_Week2.value.year +'-' +this.Click_Week2.value.month + '-' +this.Click_Week2.value.day,
    }
    this.boardService.getBoardByDate(query).subscribe(data=>{
      this.boardList = data.boardList;
      this.count = data.count;
    })
  }

  private reloadByMonth() {
    // @ts-ignore
    const query: DateQuery = {
      request : 'monthly',
      offset_date : this.Click_Month.value.year +'-' +this.Click_Month.value.month + '-01' ,
      limit_date : this.Click_Month.value.year +'-' +this.Click_Month.value.month + '-31' ,
    }
    this.boardService.getBoardByDate(query).subscribe(data=>{
      this.boardList = data.boardList;
      this.count = data.count;
    })
  }

  Click_day() : void{
    this.click_day = true;
    this.click_week = false;
    this.click_month = false;
    console.log(this.Click_Day.value)
  }

  Click_dayList() : void{
    this.click_day = true;
    this.click_week = false;
    this.click_month = false;
    console.log(this.Click_Day.value)
    this.reloadByDay()
  }

  Click_week() : void{
    this.click_week = true;
    this.click_day = false;
    this.click_month = false;
    console.log(this.Click_Week1.value)
    console.log(this.Click_Week2.value)
  }

  Click_weekList() : void{
    this.click_week = true;
    this.click_day = false;
    this.click_month = false;
    console.log(this.Click_Week1.value)
    console.log(this.Click_Week2.value)
    this.reloadByWeek()
  }

  Click_month() : void {
    this.click_month = true;
    this.click_day = false;
    this.click_week = false;
    console.log(this.Click_Month.value)
  }

  Click_monthList() : void {
    this.click_month = true;
    this.click_day = false;
    this.click_week = false;
    console.log(this.Click_Month.value)
    this.reloadByMonth()
  }

  godetail(idx: number, hit: number): void {
    console.log("클릭한 행의 idx : " + idx)
    console.log("클릭한 행의 hit :" + hit) //consol에 클릭한 행의 hit 출력되게 함
    this.router.navigate(["admin/boardList/", idx])
  }


  //아래부터 기존 날짜 입력 코드
  click_Date() : void {
    this.clickDate = true;
    this.clickWeek = false;
    this.clickMonth = false;
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
    location.href="http://localhost:4200/boardList?authority=2"
  }




}
