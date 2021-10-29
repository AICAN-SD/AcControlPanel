// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

const dailySalesChart = {
  data: {
    labels: [
      "Jan",
      "Feb",
    ],
    series: [[542, 443]],
  },
  options: {
    
    axisX: {
      showGrid: false,
    },
    low: 0,
    seriesBarDistance: 48,
    width: '150px',
    high: 1000,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0,
    },
  },
  responsiveOptions: [
    [
      "screen and (width:100px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Email Subscriptions
// #############################


const emailsSubscriptionChart = {
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
    [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
    [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
  ],
  },
  options: {
    stackBars: true,
    axisY: {
      labelInterpolationFnc: function(value) {
        return (value / 1000) + 'k';
      }
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Completed Tasks
// #############################
const chartData = {
  type: 'bar',
  options: {
      chart: {
          id: 'bar-chart',
          stacked: true,
          toolbar: {
              show: true
          },
          zoom: {
              enabled: true
          }
      },
      responsive: [
          {
              breakpoint: 480,
              options: {
                  legend: {
                      position: 'bottom',
                      offsetX: -10,
                      offsetY: 0
                  }
              }
          }
      ],
      plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: '50%'
          }
      },
      xaxis: {
          type: 'category',
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      legend: {
          show: true,
          fontSize: '14px',
          fontFamily: `'Roboto', sans-serif`,
          position: 'bottom',
          offsetX: 20,
          labels: {
              useSeriesColors: false
          },
          markers: {
              width: 16,
              height: 16,
              radius: 5
          },
          itemMargin: {
              horizontal: 15,
              vertical: 8
          }
      },
      fill: {
          type: 'solid'
      },
      dataLabels: {
          enabled: false
      },
      grid: {
          show: true
      },
      colors: [ 'rgba(144, 202, 249, 0.85)','rgba(30, 136, 229, 0.85)','rgba(103, 58, 183, 0.85)','rgba(237, 231, 246, 0.85)'],

  },
  series: [
      {
          name: 'Investment',
          data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75]
      },
      {
          name: 'Loss',
          data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75]
      },
      {
          name: 'Profit',
          data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10]
      },
      {
          name: 'Maintenance',
          data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
      }
  ]
}

const completedTasksChart = {
          
  series: [{
    name: "STOCK ABC",
    data: ['0','25','20','78','45','100']
  }],
  options: {

    chart: {
      type: 'area',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    
    title: {
      text: 'Usage Estimate',
      align: 'left'
    },
    subtitle: {
      text: 'Price Movements',
      align: 'left'
    },
    labels: ['1','2','3','4','5','6'],
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: true
    },
    legend: {
      horizontalAlign: 'left'
    }
  },
  


};
const TotalOrderMonthLineCharData = {
  type: 'line',
  height: 90,
  options: {
      chart: {
          sparkline: {
              enabled: true
          }
      },
      dataLabels: {
          enabled: false
      },
      colors: ['#fff'],
      fill: {
          type: 'solid',
          opacity: 1
      },
      stroke: {
          curve: 'smooth',
          width: 3
      },
      yaxis: {
          min: 0,
          max: 100
      },
      tooltip: {
          theme: 'dark',
          fixed: {
              enabled: false
          },
          x: {
              show: false
          },
          y: {
              title: {
                  formatter: (seriesName) => 'Total Order'
              }
          },
          marker: {
              show: false
          }
      }
  },
  series: [
      {
          name: 'series1',
          data: [45, 66, 41, 89, 25, 44, 9, 54]
      }
  ]
};

module.exports = {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  chartData,
  TotalOrderMonthLineCharData,
};
