

export const donutChart:any = { chart: {
    type: 'pie'
},
title: {
    text: 'Browser market share, January, 2018'
},
subtitle: {
    text: 'Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
},
plotOptions: {
    pie: {
        shadow: false,
        center: ['50%', '50%'],
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
    }
},
tooltip: {
    valueSuffix: '%'
},
series: [{
    name: 'Browsers',
    type: 'pie',
    data: [],
    size: '60%',
    dataLabels: {
        format:"",
        color: '#ffffff',
        distance: -30
    }
}, {
    name: 'Versions',
    data: [],
    size: '80%',
    type: 'pie',
    innerSize: '60%',
    id: 'versions'
}],
responsive: {
    rules: [{
        condition: {
            maxWidth: 400
        },
        chartOptions: {
            series: [
              {
                type: 'pie',
            }, {
                id: 'versions',
                type: 'pie',
                dataLabels: {
                    enabled: false
                }
            }]
        }
    }]
}
}