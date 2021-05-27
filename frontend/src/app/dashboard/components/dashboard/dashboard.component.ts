import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { pieChart as piechartOption } from '../helpers/piechart';
import { barChart as barchartOption} from '../helpers/barchart';
import { columnChart as columnchartOption } from '../helpers/columnchart';
import { donutChart as donutchartOption }  from '../helpers/donutchart';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //form variables
  public xaxisText:string="";
  public yaxisText:string="";
  public selectedValue:string = "";
  
  //arrays for to store json data
  public barchartData:any=[]
  public piechartData:any=[];

//public arrayTemp:any = []


  //arrays for to store and pass to into chart drawings
  public yaxisValue:any=[];
  public xaxisLabel:any=[];
  public seriesData:any=[];

  
  //Options for drawing the charts
  barchartOption = barchartOption;
  columnchartOption = columnchartOption;
  piechartOption = piechartOption;
  donutchartOption = donutchartOption;
  
  public colors = Highcharts.getOptions().colors; // colors array to store highcharts colors

  //Chart objects to display the charts on html 
  public barChart: Chart = new Chart;
  public pieChart: Chart = new Chart;
  public columnChart: Chart = new Chart;
  public donutChart: Chart = new Chart;
  
  constructor(private _http:HttpClient) {}

  ngOnInit(): void {
   //console.log(this.colors);
    this._http.get('./assets/barchart.json').subscribe(data =>{
      this.barchartData = data;
      //for each loop to make Xaxis label array and y Axis label array
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
               this.seriesData.push([v.Category,v.Percentage])
      })
      console.log(this.seriesData);
      this.drawPiechart(this.seriesData);      
      this.drawDonutchart();
    },
    error =>{
      console.log(error);
    });
    // this._http.get('./assets/piechartTest.json').subscribe(data=>{
    //   this.arrayTemp = data;
    //   this.arrayTemp.forEach((v:any)=>{
    //     let sum = this.arrayTemp.reduce((acc:number,v:any)=>{
    //       return acc = acc + v.Count;
    //     },0);
    //     let per = (v.Count / sum) * 100;
    //     this.seriesData.push([v.Category,per]);
    // });    
    // this.drawPiechart(this.seriesData);
    // },
    // error => {
    //   console.log(error);
    // });
    
  }
  //function to draw bar chart , two arguments are needed xAxis label array and Y axis label Array
  drawBarchart(x:any,y:any){
    this.barchartOption.series![0].data = y;
    this.barchartOption.xAxis.categories = x;
    this.barChart = new Chart(this.barchartOption);
  }
  //function to draw column chart , two arguments are needed xAxis label array and Y axis label Array
  drawColumnchart(x:any,y:any){
    this.columnchartOption.series![0].data = y;
    this.columnchartOption.xAxis.categories = x;    
    this.columnChart = new Chart(this.columnchartOption);
  }
  //function to draw piechart, one argument is needed to draw it data ['name','percentage'] array
  drawPiechart(data:any){
    this.piechartOption.series[0].data = data;
    this.pieChart = new Chart(this.piechartOption);
  }
  drawDonutchart(){
    console.log(donutchartOption);
    let browserData = [];
    let versionsData = [];
    let dataLen = this.piechartData.length;
    let drillDataLen;
    let brightness;
    for (let i = 0; i < dataLen; i += 1) {

      // add browser data
      browserData.push({
          name: this.piechartData[i].Category,
          y: this.piechartData[i].Percentage,
          color: this.colors![i]
      });
  
      // add version data
      drillDataLen = this.piechartData[i].version.length;
      for (let j = 0; j < drillDataLen; j += 1) {
          brightness = 0.2 - (j / drillDataLen) / 5;
          versionsData.push({
              name: this.piechartData[i].version[j].name,
              y: this.piechartData[i].version[j].Percentage,
              color: Highcharts.color(this.colors![i]).brighten(brightness).get()
          });
      }
  }
  // console.log(browserData);
  // console.log(versionsData);
  this.donutchartOption.series![0].data = browserData;
  this.donutchartOption.series![1].data = versionsData; 
  this.donutChart = new Chart(this.donutchartOption);
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
    this.xaxisText = "";
    this.yaxisText = "";
  }
}
