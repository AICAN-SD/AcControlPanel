import React from 'react'
import { Col, Row } from 'react-bootstrap'
import '../../css/ControlPanelMachineCard.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function ControlPanelMachineCard(props) {
    return (
    <Col sm={6} md={4} lg={3}>
      <div className="ControlPanelMachineCard">
        <Row id='macSwitch' >
        <BootstrapSwitchButton onChange={()=>{props.MachineToggle(props.machineData.MachineId)}} checked={props.machineData.status} size="sm" />

        </Row>

        <Row>

       
          <Col >
            <h1  className="MachineName">
              <strong >{props.machineData.MachineName}</strong>
            </h1>
            
            
            </Col>
        </Row>
        <Row>
        <h4 className="num">{props.machineData.MachineType}</h4>
        </Row>
        <Row id="rowTime">
          <Col >
         
              <span className="sun">{props.machineData.startTime}</span>
          
          </Col>
          <Col >
        
              <span className="moon">{props.machineData.endTime}</span>
            
          </Col>
        </Row>
        <Row id="rowBut">
          <Col >
              <button
                type="button"
                className="btn-default btn"
                id="on"
              >
                On time
              </button>
              </Col>
            <Col style={{paddingLeft:'0'}}>
              <button type="button" className="btn-default btn" id="of">
                Off time
              </button>
            
          </Col>
        </Row>
      </div>
    </Col>   
       )
}

export default ControlPanelMachineCard
