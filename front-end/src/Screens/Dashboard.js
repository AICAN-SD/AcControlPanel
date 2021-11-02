import React from 'react'
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core

import GridItem from "../Components/Grid/GridItem.js";
import GridContainer from "../Components/Grid/GridContainer.js";
import CardHeader from "../Components/Card/CardHeader.js";
import "../assets/css/material-dashboard-react.css"
import EarningCard from '../Components/EarningCard.js';
import OrderCard from '../Components/OrderCard.js';
import {Col,Row} from 'react-bootstrap';
import $ from 'jquery';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {
	IncreaseInCostChart,
  emailsSubscriptionChart,
  UssageEstimateChart,HourlyPowerByDevice
} from "../variables/charts.js";
// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

function Dashboard() { 

	const [data,setData]=useState([]);
  const [isLoading, setLoading] = useState(true);
  const [optIncreaseInCostChart, setOptIncreaseInCostChart] = useState({});
  const [seriesIncreaseInCostChart, setSeriesIncreaseInCostChart] = useState([]);
  const [optHourlyPowerByDevice, setOptHourlyPowerByDevice] = useState({});
  const [seriesHourlyPowerByDevice, setSeriesHourlyPowerByDevice] = useState([]);
  const [optUssageEstimateChart, setOptUssageEstimateChart] = useState({});
  const [seriesUssageEstimateChart, setSeriesUssageEstimateChart] = useState([]);
  const [seriesLineChart, setSeriesLineChart] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/machines").then((response) => {
      console.log(response.data.Data);
      setData(response.data.Data)
      setLoading(false);

    });

	//For year Inital
	setOptIncreaseInCostChart( IncreaseInCostChart.optionIncInCost(['2020','2021']))
	setSeriesIncreaseInCostChart( IncreaseInCostChart.seriesIncInCost([35,169]))
	setOptHourlyPowerByDevice( HourlyPowerByDevice.optionHourlyPowerByDevice(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']))
	setSeriesHourlyPowerByDevice( HourlyPowerByDevice.seriesHourlyPowerByDevice({data1:[35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75],data2:[35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75],data3:[35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10],data4:[0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]}))
    
	setOptUssageEstimateChart( UssageEstimateChart.optionUssageEstimateChart(['1','2','3','4','5','6']))
	setSeriesUssageEstimateChart( UssageEstimateChart.seriesUssageEstimateChart(['0','25','20','78','45','100']))
	setSeriesLineChart([45, 66, 41, 89, 25, 44, 9, 54])
   
  }, []);
//   var options = {
// 	height: '100%',
// 	chart: {
// 		type: 'bar',
// 		stacked: false,
// 		toolbar: {
// 			show: false
// 		},
// 		zoom: {
// 			enabled: true
// 		},
		
// 	},
// 	responsive: [
// 		{
// 			breakpoint: 480,
// 			options: {
// 				legend: {
// 					position: 'bottom',
// 					offsetX: -10,
// 					offsetY: 0
// 				},
				
// 			}
// 		}
// 	],
// 	plotOptions: {
// 		bar: {
// 			horizontal: false,
// 			columnWidth: '30%',
// 		}
// 	},
	
// 	legend: {
// 		show: true,
// 		fontSize: '14px',
// 		fontFamily: `'Roboto', sans-serif`,
// 		position: 'bottom',
// 		offsetX: 20,
// 		labels: {
// 			useSeriesColors: false
// 		},
// 		markers: {
// 			width: 6,
// 			height: 6,
// 			radius: 5
// 		},
// 		itemMargin: {
// 			horizontal: 5,
// 			vertical: 8
// 		}
// 	},
// 	fill: {
// 		type: 'solid'
// 	},
// 	dataLabels: {
	
// 		enabled: false
// 	},
// 	grid: {
// 		show: false
// 	},
// 	colors: ['rgba(103, 58, 183, 0.85)'],
// 	series: [
// 		{
// 			name: 'Investment',
// 			data: [35, 125]
// 		},
// 	],
	
//   }
  
  
//   $(function() {
//     console.log( "ready!" );
// 	var chart = new ApexCharts(document.querySelector("#chart"), emailsSubscriptionChart);
// 	var chart1 = new ApexCharts(document.querySelector("#chrt1"), options);
// 	chart.render();
// 	chart1.render();
	
// 	try{
// 	chart.updateOptions({
// 		title: {
// 		text: 'new title'
// 	  }
// 	})
// 	}
// 	catch(e){
// 	alert(e)
// 	}
// 	try{
// 	chart1.updateOptions({
// 		title: {
// 		text: 'new title'
// 	  }
// 	})
// 	}
// 	catch(e){
// 	alert(e)
// 	}
// });
 
  


	function onExpandRow(e) {
	   

	
			e.stopPropagation();
			var $target = $(e.target);
    console.log($target.closest("tr").next().find("td").attr('colspan'))

			if ( $target.closest("tr").next().find("td").attr('colspan') > 1 ) {
			

				$target.closest("tr").next().find("td").slideToggle("3000");
			}                    
	
	};

	   
	function onCLICK(e){
		console.log(e.target.id)
	var todayElem = document.getElementById('today');
	var monthElem = document.getElementById('month');
	var yearElem = document.getElementById('year');
		if(e.target.id==='l1'){
			setOptIncreaseInCostChart( IncreaseInCostChart.optionIncInCost(['Yesterday','Today']))
	setSeriesIncreaseInCostChart( IncreaseInCostChart.seriesIncInCost([135,19]))

	
	setSeriesHourlyPowerByDevice( HourlyPowerByDevice.seriesHourlyPowerByDevice({data1:[135, 15, 95, 55, 35, 20, 35, 10, 65, 45, 45, 5],data2:[55, 15, 35, 25, 65, 40, 80, 25, 15, 85, 25, 75],data3:[35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10],data4:[0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]}))

	setSeriesUssageEstimateChart( UssageEstimateChart.seriesUssageEstimateChart(['100','25','20','78','45','10']))

	setSeriesLineChart([15, 76, 51, 19, 85, 34, 89, 34])


		monthElem.classList.remove("active");
		yearElem.classList.remove("active");
		todayElem.classList.add("active");


		}else if(e.target.id==='l2'){
			
			setOptIncreaseInCostChart( IncreaseInCostChart.optionIncInCost(['Jan','Feb']))
	setSeriesIncreaseInCostChart( IncreaseInCostChart.seriesIncInCost([45,899]))

	setSeriesHourlyPowerByDevice( HourlyPowerByDevice.seriesHourlyPowerByDevice({data1:[5, 55, 25, 95, 35, 20, 35, 90, 65, 25, 145, 5],data2:[55, 15, 35, 25, 65, 40, 80, 25, 15, 85, 25, 75],data3:[35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10],data4:[0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]}))

	setSeriesUssageEstimateChart( UssageEstimateChart.seriesUssageEstimateChart(['10','45','80','28','45','90']))

	setSeriesLineChart([95, 26, 11, 49, 75, 94, 29, 54])

    
			monthElem.classList.add("active");
			yearElem.classList.remove("active");
			todayElem.classList.remove("active");

		}else{
			setOptIncreaseInCostChart( IncreaseInCostChart.optionIncInCost(['2020','2021']))
	setSeriesIncreaseInCostChart( IncreaseInCostChart.seriesIncInCost([35,169]))

	setSeriesHourlyPowerByDevice( HourlyPowerByDevice.seriesHourlyPowerByDevice({data1:[35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75],data2:[35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75],data3:[35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10],data4:[0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]}))

	setSeriesUssageEstimateChart( UssageEstimateChart.seriesUssageEstimateChart(['0','25','20','78','45','100']))

	setSeriesLineChart([45, 66, 41, 89, 25, 44, 9, 54])


			monthElem.classList.remove("active");
			yearElem.classList.add("active");
			todayElem.classList.remove("active");

		}
	}



	
    return (
        <div >
        <div >
			<ul class="buttonwrapper"><li id="today" onClick={(e)=>onCLICK(e)} class=""><label id="l1">TODAY</label></li><li id="month" class="" onClick={(e)=>onCLICK(e)}><label id="l2">MONTH</label></li><li id="year"  onClick={(e)=>onCLICK(e)} class="active"><label id="l3">YEAR</label></li></ul>
			</div>
 <GridContainer>
         <GridItem xs={12} sm={12} md={9}>
           <div style={{paddingTop:'15px'}}>
           <Row>
             <Col xs={12} sm={12} md={3}>
			<div className={"card mb-2 widget-content"} style={{backgroundColor:'#FF3333'}}>
				<div class="widget-content-wrapper">
					<div class="widget-content-left" style={{color:'white'}}>
						<div class="widget-heading text-second" >Room II</div>
						<div class="widget-numbers fsize-4 text-second"><span>79</span></div>
						<div class="widget-numbers fsize-1"><span>(kWh)</span></div>
					</div>
					<div class="widget-content-right">
					</div>
				</div>
			</div>
             </Col>
             <Col xs={12} sm={12} md={3}>
			<div className={"card mb-2 widget-content"} style={{backgroundColor:'#FF9933',color:'white'}}>
				<div class="widget-content-wrapper">
					<div class="widget-content-left">
						<div class="widget-heading text-second">Room II</div>
						<div class="widget-numbers fsize-4 text-second"><span>79</span></div>
						<div class="widget-numbers fsize-1"><span>(kWh)</span></div>
					</div>
					<div class="widget-content-right">
					</div>
				</div>
			</div>
             </Col>
             <Col xs={12} sm={12} md={3}>
			<div className={"card mb-2 widget-content"} style={{backgroundColor:'#74D062',color:'white'}}>
				<div class="widget-content-wrapper">
					<div class="widget-content-left">
						<div class="widget-heading text-second">Room II</div>
						<div class="widget-numbers fsize-4 text-second"><span>79</span></div>
						<div class="widget-numbers fsize-1"><span>(kWh)</span></div>
					</div>
					<div class="widget-content-right">
					</div>
				</div>
			</div>
             </Col>
             <Col xs={12} sm={12} md={3}>
              <div className={"card mb-2 widget-content"} style={{backgroundColor:'#74D062',color:'white'}}>
                <div class="widget-content-wrapper">
                  <div class="widget-content-left">
                    <div class="widget-heading text-second">Room II</div>
                    <div class="widget-numbers fsize-4 text-second"><span>79</span></div>
                    <div class="widget-numbers fsize-1"><span>(kWh)</span></div>
                  </div>
                  <div class="widget-content-right">
                  </div>
                </div>
              </div>
             </Col>
             <Col xs={12} sm={12} md={6}>
             <EarningCard isLoading={isLoading} />

             </Col>
             <Col xs={12} sm={12} md={6}>
             <OrderCard isLoading={isLoading} series={seriesLineChart} ></OrderCard>
             </Col>
           
             </Row>
             </div>
		</GridItem>
        <GridItem xs={12} sm={12} md={3}>
		
          <div style={{marginTop:'20px',backgroundColor:'white' ,width:'100%',height:'92%'}}>
			  <Row  style={{height:'100%',minHeight:'250px'}}>
          <Col xs={6} sm={6} md={6}>
                <Chart  options={optIncreaseInCostChart} series={seriesIncreaseInCostChart} type='bar' height='100%' /> 
			

          </Col>
          <Col xs={6} sm={6} md={6} >
		  <div style={{
            margin: '50% 0px 0 0',
            width: '100%',
            padding: '10px',
            textAlign:'center'
          }}>
	            <Row xs={6} sm={6} md={6}>
                <Col xs={12} sm={12} md={12}> <i class="fas fa-caret-up">&nbsp;5.42 %</i></Col>
						   <Col xs={12} sm={12} md={12}>Increase in Cost</Col>
							</Row>
							</div>

          </Col>
		  </Row>



          </div>
		
        </GridItem>
        
      </GridContainer>
      <GridContainer> 
      <GridItem xs={12} sm={12} md={6}>
         
         <CardHeader >
          <div style={{backgroundColor:'white',padding:'20px'}}>
         <Chart options={optHourlyPowerByDevice} series={seriesHourlyPowerByDevice}  type='bar'/>
         </div>

         </CardHeader>
        
    
     </GridItem>
        <GridItem xs={12} sm={12} md={6}>
         
        <CardHeader >
        <div style={{backgroundColor:'white',padding:'20px'}}>
           <Chart options={optUssageEstimateChart} series={seriesUssageEstimateChart} type="area"/>
            </div>
          
           </CardHeader>
       
        </GridItem>

      </GridContainer>
      <div class="row row3">
			<div class="col col-md-12">
				<div class="customStyle3">
					<div class="main-card mb-3 card ">
						<div class="card-header bg-heavy-rain text-muted">Device Wise Cost and Power Usage
						</div>

						
						<div class="table-responsive">
							<table class="align-middle mb-0 table table-borderless table-striped table-hover bg-light">
								<thead>
									<tr>
										<th class="text-center text-muted">Room</th>
										<th class="text-center text-muted">Consumption</th>
										<th class="text-center text-muted">kWh</th>
										<th class="text-center text-muted">Cost</th>
									</tr>
								</thead>
								<tbody>
								{data.map((floor, index) => {
        return (
          <>
           
              {floor.rooms !== undefined &&
                floor.rooms.map((room, indx) => {
                  return (
                    <>
                      <tr onClick={(e)=>onExpandRow(e)}>
										<th class="text-center text-muted">{room.roomName}</th>
										<th>
											<div class="widget-content p-0">

												<div class="mb progress">
													<div class="progress-bar progress-bar-animated progress-bar-striped text-muted"
														role="progressbar" aria-valuenow="10" aria-valuemin="0"
														aria-valuemax="100" style={{width: '100%'}}>1,640 kWh

													</div>
												</div>
											</div>
										</th>
										<th class="text-center text-muted">1,640</th>
										<th class="text-center text-muted">₹ 1043</th>
									</tr>
									<tr >
										<td colSpan="4" class="ck" style={{display:'none'}}>
										<div class="table-responsive">
							<table class="align-middle mb-0 table table-borderless table-striped table-hover bg-light">
								
									   <tbody>
                          {room.machines !== undefined &&
                            room.machines.map((machine, indxx) => {
                              return (
                                <>
                              
								      
								
									<tr>
										<th class="text-center text-muted">{machine.MachineName}</th>
										<th>
											<div class="widget-content p-0">

												<div class="mb progress">
													<div class="progress-bar progress-bar-animated progress-bar-striped text-muted"
														role="progressbar" aria-valuenow="10" aria-valuemin="0"
														aria-valuemax="100" style={{width: '67%'}}>1,640 kWh

													</div>
												</div>
											</div>
										</th>
										<th class="text-center text-muted">1,640</th>
										<th class="text-center text-muted">₹ 1043</th>
									</tr>
									
							
                                </>
                              );
                            })}
							</tbody>
							</table>
							</div>
										
									   
									   </td>
								
			
								   </tr>
                      
                    </>
                  );
                })}
        
          </>
        );
      })}
									
									

								</tbody>
							</table>
						</div>
						<div class="d-block text-center card-footer bg-heavy-rain">
						</div>
					</div>
				</div>
			</div>
			</div>
		
        </div>
    )
}

export default Dashboard
