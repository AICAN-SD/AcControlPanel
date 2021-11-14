import React from 'react'


import GridItem from "../Components/Grid/GridItem.js";
import GridContainer from "../Components/Grid/GridContainer.js";
import CardHeader from "../Components/Card/CardHeader.js";
import "../assets/css/material-dashboard-react.css"
import TotalPowerCard from '../Components/DashBoard/TotalPowerCard.js';
import TotalPowerCostCard from '../Components/DashBoard/TotalPowerCostCard';
import {Col,Row} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {
	IncreaseInCostChart,
  UssageEstimateChart,HourlyPowerByDevice
} from "../variables/charts.js";
import Chart from 'react-apexcharts';

function Dashboard() { 

  const [data,setData]=useState([]);
  const [weekPowerFloors,setWeekPowerFloors]=useState({});
  const [monthPowerFloors,setMonthPowerFloors]=useState({});
  const [yearPowerFloors,setYearPowerFloors]=useState({});
  const [monthDates,setMonthDates]=useState([]);
  const [ussageWeek,setUssageWeek]=useState([]);
  const [ussageMonth,setUssageMonth]=useState([]);
  const [ussageYear,setUssageYear]=useState([]);
  const [totalCostWeek,setTotalCostWeek]=useState([]);
  const [TotalCostMonth,setTotalCostMonth]=useState([]);
  const [totalCostYear,setTotalCostYear]=useState([]);
  const [addedMonthLabel,setAddedMonthLabel]=useState([]);
  const [addedYearLabel,setAddedYearLabel]=useState([]);
  const [totalPowerYear,setTotalPowerYear]=useState(0);
  const [totalPowerMonth,setTotalPowerMonth]=useState(0);
  const [totalPowerWeek,setTotalPowerWeek]=useState(0);
  const [totalPower,setTotalPower]=useState(0);

  const [totalPowerWeekCost,setTotalPowerWeekCost]=useState(0);
  const [totalPowerMonthCost,setTotalPowerMonthCost]=useState(0);
  const [totalPowerYearCost,setTotalPowerYearCost]=useState(0);
  const [totalPowerCost,setTotalPowerCost]=useState(0);

  const [isLoading, setLoading] = useState(true);
  const [optIncreaseInCostChart, setOptIncreaseInCostChart] = useState( IncreaseInCostChart.optionIncInCost([`${new Date().getFullYear()-1}`,`${new Date().getFullYear()}`]));
  const [seriesIncreaseInCostChart, setSeriesIncreaseInCostChart] = useState(IncreaseInCostChart.seriesIncInCost([0,0]));
  const [optHourlyPowerByDevice, setOptHourlyPowerByDevice] = useState(HourlyPowerByDevice.optionHourlyPowerByDevice(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']));
  const [seriesHourlyPowerByDevice, setSeriesHourlyPowerByDevice] = useState([]);
  const [optUssageEstimateChart, setOptUssageEstimateChart] = useState(UssageEstimateChart.optionUssageEstimateChart(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']))
  const [seriesUssageEstimateChart, setSeriesUssageEstimateChart] = useState(UssageEstimateChart.seriesUssageEstimateChart(['0','0','0','0','0','0']));
  var appendRoomNameYear={}
  var ussageYearConst=[]
  var costYearConst=[]
  var AddedYearLabel=[]
  var TotalPowerYear=0
  var TotalPowerCostYear=0
  const [seriesLineChart, setSeriesLineChart] = useState([0,0,0,0,0,0, 0, 0]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/dashboard/").then((response) => {
		console.log(response.data.weekPowerFloors)
        TotalPowerYear=response.data.totalPowerYear
		setTotalPowerYear(response.data.totalPowerYear)
		setTotalPowerWeek(response.data.totalPowerWeek)
		setTotalPowerMonth(response.data.totalPowerMonth)
		setTotalPower(response.data.totalPowerYear)

        TotalPowerCostYear=response.data.totalPowerYearCost
		setTotalPowerYearCost(response.data.totalPowerYearCost)
		setTotalPowerWeekCost(response.data.totalPowerWeekCost)
		setTotalPowerMonthCost(response.data.totalPowerMonthCost)
		setTotalPowerCost(response.data.totalPowerYearCost)


		setWeekPowerFloors(response.data.weekPowerFloors)
		setMonthPowerFloors(response.data.monthPowerFloors)
		setYearPowerFloors(response.data.yearPowerFloors)
		appendRoomNameYear=response.data.yearPowerFloors
		console.log(appendRoomNameYear)
		setMonthDates(response.data.monthDates)
		setSeriesHourlyPowerByDevice(HourlyPowerByDevice.seriesHourlyPowerByDevice(appendRoomNameYear))
		setUssageYear(response.data.ussageYear)
		ussageYearConst=response.data.ussageYear
		setTotalCostMonth(response.data.totalCostMonth)
		setSeriesUssageEstimateChart( UssageEstimateChart.seriesUssageEstimateChart(ussageYearConst))

		setUssageMonth(response.data.ussageMonth)
		setUssageWeek(response.data.ussageWeek)

		setTotalCostYear(response.data.totalCostYear)
		
		setTotalCostWeek(response.data.totalCostWeek)
		costYearConst=response.data.totalCostYear
		setSeriesIncreaseInCostChart( IncreaseInCostChart.seriesIncInCost(costYearConst))

        
		AddedYearLabel=response.data.addedYearLabel
		
        setAddedYearLabel(AddedYearLabel)

		setAddedMonthLabel(response.data.addedMonthLabel)
		
		
	})

    axios.get("http://127.0.0.1:8000/api/machines/").then((response) => {
      var Data=response.data.Data;
	  
      setData(Data)
      setLoading(false);
	  

    });


	//For year Inital
    
	setSeriesLineChart([45, 66, 41, 89, 25, 44, 9, 54])
   
  }, []);
   
	function onCLICK(e){
	var weekElem = document.getElementById('week');
	var monthElem = document.getElementById('month');
	var yearElem = document.getElementById('year');
	if(e.target.id==='l1'){
		//Weekly data
        setTotalPower(totalPowerWeek)
		setTotalPowerCost(totalPowerWeekCost)
		setOptIncreaseInCostChart( IncreaseInCostChart.optionIncInCost(['Last Week','This Week']))
	    setSeriesIncreaseInCostChart( IncreaseInCostChart.seriesIncInCost(totalCostWeek))

	    setOptHourlyPowerByDevice(HourlyPowerByDevice.optionHourlyPowerByDevice(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']))
	
		// for (var x in data){

		// 	appendRoomName[data[x].floor] = [135, 15, 95, 55, 35, 20, 35];

		// }
		setSeriesHourlyPowerByDevice(HourlyPowerByDevice.seriesHourlyPowerByDevice(weekPowerFloors))

		setOptUssageEstimateChart(UssageEstimateChart.optionUssageEstimateChart(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']))
		setSeriesUssageEstimateChart( UssageEstimateChart.seriesUssageEstimateChart(ussageWeek))
		
		
		setSeriesLineChart([15, 76, 51, 19, 85, 34, 89, 34])


			monthElem.classList.remove("active");
			yearElem.classList.remove("active");
			weekElem.classList.add("active");


		}else if(e.target.id==='l2'){
			
			setTotalPower(totalPowerMonth)

			setTotalPowerCost(totalPowerMonthCost)

			setOptIncreaseInCostChart( IncreaseInCostChart.optionIncInCost(addedMonthLabel))
	setSeriesIncreaseInCostChart( IncreaseInCostChart.seriesIncInCost(TotalCostMonth))
	setOptHourlyPowerByDevice(HourlyPowerByDevice.optionHourlyPowerByDevice(monthDates))

setOptUssageEstimateChart(UssageEstimateChart.optionUssageEstimateChart(monthDates));

setSeriesUssageEstimateChart( UssageEstimateChart.seriesUssageEstimateChart(ussageMonth))



setSeriesHourlyPowerByDevice(HourlyPowerByDevice.seriesHourlyPowerByDevice(monthPowerFloors))



	setSeriesLineChart([95, 26, 11, 49, 75, 94, 29, 54])

    
			monthElem.classList.add("active");
			yearElem.classList.remove("active");
			weekElem.classList.remove("active");

		}else{
			setTotalPower(totalPowerYear)
			setTotalPowerCost(totalPowerYearCost)

			setOptIncreaseInCostChart( IncreaseInCostChart.optionIncInCost(addedYearLabel))
	setSeriesIncreaseInCostChart( IncreaseInCostChart.seriesIncInCost(totalCostYear))

	setOptHourlyPowerByDevice(HourlyPowerByDevice.optionHourlyPowerByDevice(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']));

	setSeriesHourlyPowerByDevice( HourlyPowerByDevice.seriesHourlyPowerByDevice(yearPowerFloors))


	setOptUssageEstimateChart(UssageEstimateChart.optionUssageEstimateChart(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']))

	setSeriesUssageEstimateChart( UssageEstimateChart.seriesUssageEstimateChart(ussageYear))

	setSeriesLineChart([45, 66, 41, 89, 25, 44, 9, 54])


			monthElem.classList.remove("active");
			yearElem.classList.add("active");
			weekElem.classList.remove("active");

		}
	}



	
    return (
        <div >
        <div >
			<ul class="buttonwrapper"><li id="week" onClick={(e)=>onCLICK(e)} class=""><label id="l1">WEEK</label></li><li id="month" class="" onClick={(e)=>onCLICK(e)}><label id="l2">MONTH</label></li><li id="year"  onClick={(e)=>onCLICK(e)} class="active"><label id="l3">YEAR</label></li></ul>
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
             <Col xs={12} sm={12} md={6} >
             <TotalPowerCard isLoading={isLoading} totalPower={totalPower}/>

             </Col>
             <Col xs={12} sm={12} md={6}>
             <TotalPowerCostCard isLoading={isLoading} totalPowerCost={totalPowerCost} series={seriesLineChart}/>
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
					
                      <tr  key={`${index}`+`${indx}`} data-toggle="collapse" id={'row'+index+indx} data-target={'.row'+index+indx}>
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
									
                          {room.machines !== undefined &&
                            room.machines.map((machine, indxx) => {
                              return (
                                
                              
								      
								
									<tr key={`${index}`+`${indxx}`}  class={`collapse row${index}${indx}`}>
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
									
							
                            
                              );
                            })}
							
										
									   
									  
								
                      
                    </>
                  );
                })}
        
          </>
        );
      })}
									
									

								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			</div>
		
        </div>
    )
}

export default Dashboard
