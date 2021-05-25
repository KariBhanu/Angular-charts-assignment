import { Options } from 'highcharts';
export const lineChart:Options = {
    chart: {
        type: 'line'
    },
      title: {
        text: 'Covid-19 Data Analytics'
    },
  
    subtitle: {
        text: 'Source:  <a href="https://www.covid19india.org/">covid19india.org</a>'
    },
  
    yAxis: {
        title: {
            text: 'Casualities year wise'
        },
        tickInterval:1,
        crosshair: true
    },
  
    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2016 to 2021'
        },
        tickInterval:1,
        crosshair: true
    },
  
    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
    },
  
    plotOptions: {
        
        line: {
            label: {
                connectorAllowed: false
            },
            dataLabels:{
                enabled: true
            },
            pointStart: 2016,
            pointInterval:1
        }
    },
  
    series: [{
        name: 'Confirmed',
        type: 'line',
        data: [30, 50, 170, 2176, 167453, 1874563,16937865, 22345713]
    },
    {
        name: 'Deceased',
        type: 'line',
        data: [0, 1, 4, 3, 4078, 11239, 167891, 1233789]
    },
    {
        name: 'Recovered',
        type: 'line',
        data: [30, 49, 166, 2130, 163375, 1863324, 15937865, 20345713]
    },

],
  
    // responsive: {
    //     rules: [{
    //         condition: {
    //             maxWidth: 500
    //         },
    //         chartOptions: {
    //             legend: {
    //                 layout: 'horizontal',
    //                 align: 'center',
    //                 verticalAlign: 'bottom'
    //             }
    //         }
    //     }]
    // }
}