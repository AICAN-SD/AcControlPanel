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
      yaxis: {
        decimalsInFloat: true,
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
          name: 'Cost (₹) ',
          data: data
      },
  ]

  
  
}

}

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
      title: {
        text: 'Power Used by Floors (kWh)',
        align: 'left'
      },
      
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
      yaxis: {
        decimalsInFloat: true,
    },
      colors: [ 'rgba(144, 202, 249, 0.85)','rgba(30, 136, 229, 0.85)','rgba(103, 58, 183, 0.85)',
      'rgba(237, 231, 246, 0.85)','#8EB0E9','#0063DA','#00ACF3', '#5FDEFD','#404756','#7978ED','#5CDCFE',
      '#3BECEB','#6BF7C5','#9394D4','#D1F5FF','#9DADBC','#00355A','#D2EAE6','#7CFAC3',
      '#006CC5','#9C5A95','#AF7AFF','#8B5ADB','#D49CFF','#7A91BC','#1E88E5','#007FE4','#0094D7',
      '#00A5BA','#00B397','#0052A7','#003989','#00236C','#A06AFF','#CCB5EA','#FBEAFF','#366C7F','#D5CABD',
    ],

  }
    
  },
  seriesHourlyPowerByDevice: function(data){
    var array=[]
    Object.entries(data).forEach(([key, value]) => {
      array.push( {
        name: key,
        data: value
    })
    });
    return  array;
    
  }
  
  
  
}

const UssageEstimateChart = {
  optionUssageEstimateChart: function(category){
      return {

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
    yaxis: {
        decimalsInFloat: true,
    },
    stroke: {
      curve: 'straight'
    },
    
    title: {
      text: 'Usage Estimate',
      align: 'left'
    },
    xaxis: {
        type: 'category',
        categories: category
    },
    legend: {
      horizontalAlign: 'left'
    }
  } },
  seriesUssageEstimateChart: function(data){return [{
    name: "kwh",
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
                formatter: (seriesName) => 'Total Cost'
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
  UssageEstimateChart,
  HourlyPowerByDevice,
  TotalOrderMonthLineCharData,
};
