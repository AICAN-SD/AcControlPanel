import React from 'react'
import { Col, Row } from 'react-bootstrap'
import '../css/ControlPanelMachineCard.css'
import SwitchButton from './SwitchButton'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function ControlPanelMachineCard(props) {
  console.log(props.machineData)
    return (
    <Col xs={12} sm={6} md={3}>
      <div className="ControlPanelMachineCard">
        <Row>
       
          <Col xs={12} sm={6} md={9}>
            <h1 className="MachineName">
              <strong>{props.machineData.MachineName}</strong>
            </h1>
            <h4 className="num">{props.machineData.MachineType}</h4>
            
            </Col>
          <Col xs={12} sm={6} md={3}>
          <BootstrapSwitchButton onChange={()=>{props.MachineToggle(props.machineData.MachineId)}} checked={props.machineData.status} size="sm" />
            </Col>
        </Row>
        <Row id="row1">
          <div className="col-sm-6" style={{paddingLeft:'0'}}>
         
              <span className="sun">{props.machineData.startTime}</span>
          
          </div>
          <div className="col-sm-6" style={{paddingLeft:'0'}}>
        
              <span className="moon">{props.machineData.endTime}</span>
            
          </div>
          <div className="row" id="row2">
            <div className="col-sm-4">
              <button
                type="button"
                className="btn-default btn"
                id="on"
                style={{ float: "right" }}
              >
                <i className="fa fa-clock" />
                <strong>On time</strong>{" "}
              </button>
            </div>
            <div className="col-sm-4">
              <button type="button" className="btn-default btn" id="of">
                <i className="fa fa-clock" />
                <strong>Off time</strong>{" "}
              </button>
            </div>
          </div>
        </Row>
      </div>
    </Col>   
       )
}

export default ControlPanelMachineCard
