export const columnChart:any = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Historic World Population by Region'
    },
    subtitle: {
        text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
    },
    xAxis: {
        categories: [
        ],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0,
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'Tokyo',
        type: 'column',
        data: [] 
    }]
}