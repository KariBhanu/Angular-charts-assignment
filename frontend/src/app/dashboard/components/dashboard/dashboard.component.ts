import { Component, OnInit } from '@angular/core';
//import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { pieChart as piechartOption } from '../helpers/piechart';
import { barChart as barchartOption} from '../helpers/barchart';
import { columnChart as columnchartOption } from '../helpers/columnchart';
import { donutChart }  from '../helpers/donutchart';
import { HttpClient } from "@angular/common/http";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public xaxisText:string="";
  public yaxisText:string="";
  public selectedValue:string = "";

  public barchartData:any=[];
  public piechartData:any=[];
  public yaxisValue:any=[];
  public xaxisLabel:any=[];
  public seriesData:any=[];
  
  barchartOption = barchartOption;
  columnchartOption = columnchartOption;
  piechartOption = piechartOption;
  //barOptions:Options = barchartOption;
  

  public barChart: Chart = new Chart;
  public pieChart: Chart = new Chart;
  public columnChart: Chart = new Chart;
  public donutChart: Chart = new Chart;
  constructor(private _http:HttpClient) { 
    
  }

  ngOnInit(): void {
   
    this._http.get('./assets/barchart.json').subscribe(data =>{
      this.barchartData = data;
      this.barchartData.forEach((v : any)=>{
        this.xaxisLabel.push(v.Category);
        this.yaxisValue.push(v.Population);
      })
      this.drawBarchart(this.xaxisLabel,this.yaxisValue);
      this.drawColumnchart(this.xaxisLabel,this.yaxisValue);
    },
    error =>{
      console.log(error);
    });
    this._http.get('./assets/piechart.json').subscribe(data =>{
      this.piechartData = data;
      this.piechartData.forEach((v : any)=>{
        if(v.Category != 'QQ' && v.Category != 'Others')        
        {this.seriesData.push([v.Category,v.Percentage,v.Category]);}
        else{
          this.seriesData.push([v.Category,v.Percentage,null]);
        }
      })
      console.log(this.seriesData);
      this.drawPiechart(this.seriesData);
      this.drawDonutchart();
    },
    error =>{
      console.log(error);
    });
    this.percentageCal();
  }
  drawBarchart(x:any,y:any){
    this.barchartOption.series![0].data = y;
    this.barchartOption.xAxis.categories = x;
    this.barChart = new Chart(this.barchartOption);
  }
  drawColumnchart(x:any,y:any){
    this.columnchartOption.series![0].data = y;
    this.columnchartOption.xAxis.categories = x;    
    this.columnChart = new Chart(this.columnchartOption);
  }
  drawPiechart(data:any){
    this.piechartOption.series[0].data = data;
    this.pieChart = new Chart(this.piechartOption);
  }
  drawDonutchart(){
    this.donutChart = new Chart(donutChart);
  }

  submit(){
    if(this.selectedValue == 'Barchart' || this.selectedValue == 'Columnchart')
    {
      this.xaxisLabel.push(this.xaxisText);
      this.yaxisValue.push(parseInt(this.yaxisText));
      this.drawBarchart(this.xaxisLabel,this.yaxisValue);
      this.drawColumnchart(this.xaxisLabel,this.yaxisValue); 
    }
    // else if(this.selectedValue == 'Columnchart'){
    //   this.xaxisLabel.push(this.xaxisText);
    //   this.yaxisValue.push(parseInt(this.yaxisText));
    //   this.drawColumnchart(this.xaxisLabel,this.yaxisValue);  
    //   this.drawBarchart(this.xaxisLabel,this.yaxisValue);
    // }
    else{
        console.log("eroor");
    }
  }
  
  percentageCal(){
    let array = [
      {
        "Category": "Chrome",
        "Count": 80
      },
      {
        "Category": "Internet Explorer",
        "Count": 15
      },
      {
        "Category": "Firefox",
        "Count": 5
      }
    ];
    array.forEach((v:any)=>{
        let sum = array.reduce((acc:number,v:any)=>{
          return acc = acc + v.Count;
        },0);
        let per = (v.Count / sum) * 100;
        console.log(per);
    });
  }



}
