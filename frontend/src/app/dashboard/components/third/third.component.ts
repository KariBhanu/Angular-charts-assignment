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
    this.previousText = this.inputText.replace(/<[^>]*>?/gm, '');
    this.previousText = this.previousText.replace(/[^\w\s]/gi, '');
    this.inputText = "";
    this.countWords(this.previousText);   
  }
  countWords(str:string){

      str = str.replace(/(^\s*)|(\s*$)/gi,"");
      str = str.replace(/[ ]{2,}/gi," ");
      str = str.replace(/\n /,"\n");
      this.wordCount = str.split(' ').length;
      this.vowelCount = this.vowelCounter(str);
      this.articleCount = this.articleCounter(str.split(' '));
      this.longestWordLength=this.longestWordLengthCounter(str.split(' '));
      this.shortestWordlength=this.shortestWordLengthCounter(str.split(' '));      
  }
  vowelCounter(str:string){
    if(str.match(/[aeiou]/gi)?.length != undefined){
      //this.vowelArray = str.match(/[aeiou]/gi)!;      
      return str.match(/[aeiou]/gi)!.length;
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


