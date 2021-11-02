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

const IncreaseInCostChart = {
  optionIncInCost: function(category){
  return {
    
      chart: {
          id: 'bar-chart',
          stacked: false,
          toolbar: {
              show: false
          },
          zoom: {
              enabled: true
          },
          
      },
      responsive: [
          {
              breakpoint: 480,
              options: {
                  legend: {
                      position: 'bottom',
                      offsetX: -10,
                      offsetY: 0
                  },
                  
              }
          }
      ],
      plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: '30%',
          }
      },
      xaxis: {
          type: 'category',
          categories:category
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
              width: 6,
              height: 6,
              radius: 5
          },
          itemMargin: {
              horizontal: 5,
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
          show: false
      },
      colors: ['rgba(103, 58, 183, 0.85)'],

  }
  
},
  seriesIncInCost: function(data){
  return  [
      {
          name: 'Investment',
          data: data
      },
  ]

  
  
}

}

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
    },
    toolbar: {
      show: false
  },
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
var HourlyPowerByDevice = {
  optionHourlyPowerByDevice: function(category){
    return {
      chart: {
          id: 'bar-chart',
          stacked: true,
          toolbar: {
              show: false
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
          categories: category
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

  }
    
  },
  seriesHourlyPowerByDevice: function(data){
    return  [
      {
          name: 'Investment',
          data: data.data1
      },
      {
          name: 'Loss',
          data: data.data2
      },
      {
          name: 'Profit',
          data: data.data3
      },
      {
          name: 'Maintenance',
          data: data.data4
      }
  ]
    
  }
  
  
  
}

const UssageEstimateChart = {
  optionUssageEstimateChart: function(category){return {

    chart: {
      type: 'area',
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
    labels: category,
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: true
    },
    legend: {
      horizontalAlign: 'left'
    }
  } },
  seriesUssageEstimateChart: function(data){return [{
    name: "STOCK ABC",
    data: data
  }]}
  


};
const TotalOrderMonthLineCharData = {
  optionTotalOrderMonthLineCharData: function(category){return {
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
}},
  seriesTotalOrderMonthLineCharData: function(data){return [
    {
        name: 'series1',
        data: data
    }
]}
};

module.exports = {
  IncreaseInCostChart,
  emailsSubscriptionChart,
  UssageEstimateChart,
  HourlyPowerByDevice,
  TotalOrderMonthLineCharData,
};
