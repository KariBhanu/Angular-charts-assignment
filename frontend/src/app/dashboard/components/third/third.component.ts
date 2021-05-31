import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit {

  public wordCount: number = 0;
  public vowelCount:number = 0;
  public articleCount:number = 0;
  public longestWordLength:number = 0;
  public shortestWordlength:number = 0;
  public inputText:string="";
  public previousText:string="";


  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.previousText = this.inputText.replace(/<[^>]*>?/gm, '');//removing formating
    this.previousText = this.previousText.replace(/[^\w\s]/gi, '');//removing special charaters
    this.inputText = "";
    this.countWords(this.previousText);   
  }
  countWords(str:string){
      str = str.replace(/(^\s*)|(\s*$)/gi,"");//removing spaces on both sides
      str = str.replace(/[ ]{2,}/gi," ");//removing double spaces in between
      str = str.replace(/\n /,"\n");//removing new lines
      this.wordCount = str.split(' ').length;
      this.vowelCount = this.vowelCounter(str);
      this.articleCount = this.articleCounter(str.split(' '));
      this.longestWordLength=this.longestWordLengthCounter(str.split(' '));
      this.shortestWordlength=this.shortestWordLengthCounter(str.split(' '));      
  }
  vowelCounter(str:string){
    if(str.match(/[aeiou]/gi)?.length != undefined){
      //this.vowelArray = str.match(/[aeiou]/gi)!;      
      return str.match(/[aeiouAEIOU]/gi)!.length;
    }
    else{
      return 0;
    }
  }
  articleCounter(array:any){
    let temp = 0;
    array.forEach((s:any)=>{
      if(s ==='the' || s ==='a' || s === 'an') {
        temp = temp + 1;
      }
    });
    return temp;
  }
  longestWordLengthCounter(array:any){
    let max = 0;
    array.forEach((s:any)=>{
      if(s.length>max){
        max = s.length;
      }
    });
    return max;
  }
  shortestWordLengthCounter(array:any){
    //temp array is array with out articles
    let tempArray = array.filter((v:any)=>{
        if( v != 'a' && v!='an' && v!='the'){return v}
    });
    if(tempArray.length>0){
      let min = tempArray[0].length;
      tempArray.forEach((v:any)=>{
        if(v.length < min){
          min = v.length;    
        }
      });
      return min;
    }
    else{
      return 0;
    }
  }
  
}


