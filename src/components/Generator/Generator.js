import ApexCharts from 'apexcharts';
import React from "react";
import ReactApexCharts from 'react-apexcharts'

var lastDate = 0;
var data = []
var TICKINTERVAL = 86400000
let XAXISRANGE = 777600000
function getDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        data.push({
            x, y
        });
        lastDate = baseval
        baseval += TICKINTERVAL;
        i++;
    }
}

getDayWiseTimeSeries(new Date('01 Oct 2019 GMT').getTime(), 30, {
    min: 20,
    max: 50
})

function getNewSeries(baseval, yrange) {
    var newDate = baseval + TICKINTERVAL;
    lastDate = newDate

    for(var i = 0; i< data.length - 10; i++) {
        // IMPORTANT
        // we reset the x and y of the data which is out of drawing area
        // to prevent memory leaks
        data[i].x = newDate - XAXISRANGE - TICKINTERVAL
        data[i].y = 0
    }

    data.push({
        x: newDate,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    })

}


class Progress extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'realtime',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'butt',
                    colors: undefined,
                    width: 8,
                    dashArray: 0,
                },
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'datetime',
                    range: XAXISRANGE,
                    labels: {
                        show: false
                    },
                },
                yaxis: {
                    max: 100
                },
                legend: {
                    show: false
                }
            },
            series: [{
                data: data.slice()
            }],
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.intervals()
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval();
    }

    intervals () {
        window.setInterval(() => {
            if(this._isMounted) {
            getNewSeries(lastDate, {
                min: 20,
                max: 50
            });

                ApexCharts.exec('realtime', 'updateSeries', [{
                    data: data
                }])
            }
        }, 1000)
    }

    render() {

        return (

            <div id="chart">
                <ReactApexCharts options={this.state.options} series={this.state.series} type="line" height="250" />
            </div>


        );
    }

}

export default Progress;