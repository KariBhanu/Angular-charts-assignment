import { Options } from 'highcharts';

export const areaChart:Options = {
    chart: {
      type: 'area'
  },
  title: {
      text: 'Covid-19 Data Analytics'
  },
  subtitle: {
      text: 'Source:  <a href="https://www.covid19india.org/">covid19india.org</a>'
  },
  tooltip: {
     // pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
  },
  yAxis: {
    title: {
        text: 'Casualities year wise'
    },
    tickInterval:1,
    crosshair: true
},

xAxis: {
    tickInterval:1,
    crosshair: true
},
  plotOptions: {
      area: {
          pointStart: 2016,
          dataLabels:{
            enabled: true
        },
          marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                  hover: {
                      enabled: true
                  }
              }
          }
      }
  },
  series: [
    {
      name: 'Confirmed',
      type: 'area',
      data: [30, 50, 170, 2176, 167453, 1874563,16937865, 22345713]
    },
    {
        name: 'Deceased',
        type: 'area',
        data: [0, 1, 4, 3, 4078, 11239, 167891, 1233789]
    },
    {
        name: 'Recovered',
        type: 'area',
        data: [30, 49, 166, 2130, 163375, 1863324, 15937865, 20345713]
    },
]
  }