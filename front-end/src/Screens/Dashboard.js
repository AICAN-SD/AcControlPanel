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
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,chartData
} from "../variables/charts.js";
// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

function Dashboard() { 

	const [data,setData]=useState([]);
  const [isLoading, setLoading] = useState(true);

 
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/machines").then((response) => {
      console.log(response.data.Data);
      setData(response.data.Data)
      setLoading(false);

    });
    
   
  }, []);


	function onExpandRow(e) {
	   

	
			e.stopPropagation();
			var $target = $(e.target);
    console.log($target.closest("tr").next().find("td").attr('colspan'))

			if ( $target.closest("tr").next().find("td").attr('colspan') > 1 ) {
			

				$target.closest("tr").next().find("td").slideToggle("3000");
			}                    
	
	};
	
    return (
        <div >
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
             <OrderCard isLoading={isLoading} ></OrderCard>
             </Col>
           
             </Row>
             </div>
		</GridItem>
        <GridItem xs={12} sm={12} md={3}>
		
          <div style={{marginTop:'30px'}}>
            <CardHeader color="danger">
			<GridContainer>
         <GridItem xs={12} sm={12} md={6} style={{
  margin: '45px 0px 0px 0',
  width: '100%',
  padding: '10px',
  textAlign:'center'
}}>
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Bar"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
			    </GridItem>
				<GridItem xs={12} sm={12} md={6}>
				<div style={{
            margin: '45px 0px 0px 0',
            width: '100%',
            padding: '10px',
            textAlign:'center'
          }}>
	            <Row>
                <Col xs={12} sm={12} md={12}> <i class="fas fa-caret-up">&nbsp;5.42 %</i></Col>
						   <Col xs={12} sm={12} md={12}>Increase in Cost</Col>
							</Row>
							</div>
				</GridItem>
		  </GridContainer>
            </CardHeader>
           
          </div>
		
        </GridItem>
        
      </GridContainer>
      <GridContainer> 
      <GridItem xs={12} sm={12} md={6}>
         
         <CardHeader >
          <div style={{backgroundColor:'white',padding:'20px'}}>
         <Chart {...chartData} />
         </div>

         </CardHeader>
        
    
     </GridItem>
        <GridItem xs={12} sm={12} md={6}>
         
        <CardHeader >
        <div style={{backgroundColor:'white',padding:'20px'}}>
           <Chart {...completedTasksChart} type="area"/>
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
