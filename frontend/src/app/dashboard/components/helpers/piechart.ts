import { Options } from 'highcharts';
export const pieChart:any = {   
    chart: {
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Browser market shares in January, 2018'
  },
  subtitle: {
    text: 'Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
},
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: [{
      name: 'Brands',
      type:'pie',
      colorByPoint: true,
      //keys:['name','y','drilldown'],
      data:[]
      //data:[45.0,26.8,12.8,8.5,6.2,0.7]
    //   data: [{
    //       name: 'Chrome',
    //       y: 61.41
    //   }, {
    //       name: 'Internet Explorer',
    //       y: 11.84
    //   }, {
    //       name: 'Firefox',
    //       y: 10.85
    //   }, {
    //       name: 'Edge',
    //       y: 4.67
    //   }, {
    //       name: 'Safari',
    //       y: 4.18
    //   }, {
    //       name: 'Sogou Explorer',
    //       y: 1.64
    //   }, {
    //       name: 'Opera',
    //       y: 1.6
    //   }, {
    //       name: 'QQ',
    //       y: 1.2
    //   }, {
    //       name: 'Other',
    //       y: 2.61
    //   }]
  }]
}
