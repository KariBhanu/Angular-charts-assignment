import { Component, OnInit } from '@angular/core';
//import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { pieChart } from '../helpers/piechart';
import { barChart as barchartOption} from '../helpers/barchart';
import { columnChart } from '../helpers/columnchart';
import { donutChart }  from '../helpers/donutchart';
import { Options } from 'highcharts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public xaxisText:string="";
  public yaxisText:string="";

  public dataArray = [50, 72, 200, 130, 144];
  
  barchartOption = barchartOption;
  options:Options = barchartOption;

  barChart = new Chart(this.options);
  pieChart = new Chart(pieChart);
  columnChart = new Chart(columnChart);
  donutChart = new Chart(donutChart);
  
  constructor() { 
    
  }

  ngOnInit(): void {
   
  }

  submit(){
    this.barchartOption.series![0].data = this.dataArray;
    this.options = this.barchartOption;
    this.barChart = new Chart(this.options);
    console.log(barchartOption.series![0].data);
  }
}
