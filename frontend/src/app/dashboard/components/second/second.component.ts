import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { lineChart } from '../helpers/linechart';
import { areaChart } from '../helpers/areachart';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  lineChart = new Chart(lineChart);
  areaChart = new Chart(areaChart);
  counter:number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  add(){
   var temp = setInterval(()=>{
      this.addPoint();
       if(this.counter>=5){
        clearInterval(temp);
      }
   },1000);  
  }


  addPoint() {
    console.log(lineChart.series);
    if(this.counter===4){
    this.lineChart.addPoint(0,0);
    this.lineChart.addPoint(0,1);
    this.lineChart.addPoint(0,2);
    this.areaChart.addPoint(0,0);
    this.areaChart.addPoint(0,1);
    this.areaChart.addPoint(0,2);
    }
    else{
    let confirmed = Math.floor(Math.random()*10000000);
    let deceased = Math.floor(Math.random() * 1000000);
    let recovered = confirmed - deceased;
    this.lineChart.addPoint(confirmed,0);
    this.lineChart.addPoint(deceased,1);
    this.lineChart.addPoint(recovered,2);
    this.areaChart.addPoint(confirmed,0);
    this.areaChart.addPoint(deceased,1);
    this.areaChart.addPoint(recovered,2);
    }
    this.counter = this.counter + 1;
  }
}
