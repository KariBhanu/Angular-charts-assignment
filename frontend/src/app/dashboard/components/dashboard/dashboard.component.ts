import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { pieChart as piechartOption } from '../helpers/piechart';
import { barChart as barchartOption} from '../helpers/barchart';
import { columnChart as columnchartOption } from '../helpers/columnchart';
import { donutChart as donutchartOption }  from '../helpers/donutchart';
import { HttpClient } from "@angular/common/http";
import { Options } from 'highcharts';
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
  public sum:any;
  
  //arrays for to store json data
  public barchartData:any=[]
  public piechartData:any=[];

public arrayTemp:any = []


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


  
  constructor(private _http:HttpClient) {}

  ngOnInit(): void {
    this._http.get('./assets/barchart.json').subscribe(data =>{
      this.barchartData = data;
      //for each loop to make Xaxis label array and y Axis label array
      this.barchartData.forEach((v : any)=>{
        this.xaxisLabel.push(v.Category);
        this.yaxisValue.push(v.Population);
      })
    },
    error =>{
      console.log(error);
    });
    // this._http.get('./assets/piechart.json').subscribe(data =>{
    //   this.piechartData = data;     
    //   //this.drawDonutchart();
    // },
    // error =>{
    //   console.log(error);
    // });
    this._http.get('./assets/piechartTest.json').subscribe(data=>{
      this.arrayTemp = data;
     
      this.arrayTemp.forEach((v:any)=>{
        this.sum = this.arrayTemp.reduce((acc:number,v:any)=>{
          return acc = acc + v.Count;
        },0);
        let per = (v.Count / this.sum) * 100;
        this.seriesData.push([v.Category,per]);
    });    
    },
    error => {
      console.log(error);
    });
    
  }
  drawbar(){
    this.selectedValue = 'Barchart';
    this.barchartOption.xAxis.categories = this.xaxisLabel;
    this.barchartOption.series![0].data = this.yaxisValue;
    Highcharts.chart('barchart',this.barchartOption as Options);
  }
  drawcolumn(){
    this.selectedValue = 'Columnchart';
    this.columnchartOption.series![0].data = this.yaxisValue;
    this.columnchartOption.xAxis.categories = this.xaxisLabel;
    Highcharts.chart('columnchart',this.columnchartOption as Options);
  }
  drawpie(){
    this.selectedValue = 'Piechart';
    this.piechartOption.series[0].data = this.seriesData;
    console.log(this.seriesData)
    Highcharts.chart('piechart',this.piechartOption as Options);
  }
  
  // drawDonutchart(){
  //   this.selectedValue = 'Donutchart';
    
  //   let browserData = [];
  //   let versionsData = [];
  //   let dataLen = this.piechartData.length;
  //   let drillDataLen;
  //   let brightness;
    
  //   for (let i = 0; i < dataLen; i += 1) {

  //     // add browser data
  //     browserData.push({
  //         name: this.piechartData[i].Category,
  //         y: this.piechartData[i].Percentage,
  //         color: this.colors![i]
  //     });
  
  //     // add version data
  //     drillDataLen = this.piechartData[i].version.length;
  //     for (let j = 0; j < drillDataLen; j += 1) {
  //         brightness = 0.2 - (j / drillDataLen) / 5;
  //         versionsData.push({
  //             name: this.piechartData[i].version[j].name,
  //             y: this.piechartData[i].version[j].Percentage,
  //             color: Highcharts.color(this.colors![i]).brighten(brightness).get()
  //         });
  //     }
  // }
  // // console.log(browserData);
  // // console.log(versionsData);
  // this.donutchartOption.series![0].data = browserData;
  // this.donutchartOption.series![1].data = versionsData; 
  // Highcharts.chart('donutchart',this.donutchartOption as Options)
  // }

  percentageCal(x:any,y:any){
    this.seriesData = [];
    this.sum = this.sum + y;
    this.arrayTemp.forEach((v:any)=>{
      let per = (v.Count / this.sum) * 100;
      this.seriesData.push([v.Category,per]);
    }); 
    this.seriesData.push([x,(y/this.sum)*100]);
  }

  submit(){
    if(this.selectedValue == 'Barchart' || this.selectedValue == 'Columnchart')
    {
      this.xaxisLabel.push(this.xaxisText);
      this.yaxisValue.push(parseInt(this.yaxisText)); 
      this.drawbar();
      this.drawcolumn();
    }
    else if(this.selectedValue == 'Piechart' || this.selectedValue == 'Columnchart')
    {
      this.percentageCal(this.xaxisText,this.yaxisText);
      this.drawpie();
    }
    else{
        console.log("error");
    }
    this.xaxisText = "";
    this.yaxisText = "";
  }

  drawdonut(){
    this.selectedValue = 'Donutchart';
    
    let browserData = [];
    let versionsData = [];
    let dataLen = this.arrayTemp.length;
    let drillDataLen;
    let brightness;
    
    for (let i = 0; i < dataLen; i += 1) {

      // add browser data
      browserData.push({
          name: this.arrayTemp[i].Category,
          y: (this.arrayTemp[i].Count/this.sum)*100,
          color: this.colors![i]
      });
  
      // add version data
      drillDataLen = this.arrayTemp[i].version.length;
      for (let j = 0; j < drillDataLen; j += 1) {
          brightness = 0.2 - (j / drillDataLen) / 5;
          versionsData.push({
              name: this.arrayTemp[i].version[j].name,
              y: (this.arrayTemp[i].version[j].Count/this.sum)*100,
              color: Highcharts.color(this.colors![i]).brighten(brightness).get()
          });
      }
  }
  console.log(browserData);
  console.log(versionsData);
  this.donutchartOption.series![0].data = browserData;
  this.donutchartOption.series![1].data = versionsData; 
  Highcharts.chart('donutchart',this.donutchartOption as Options)
  }


}
