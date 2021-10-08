import React from 'react'
import { Col,Dropdown,Form, Row} from 'react-bootstrap'
import '../css/MachineCard.css'

function MachineCard(props) {
    return (
        <>
      
            <Col xs={3}>
            <div className="machineCard">
        <Row>
          <Col xs={4}>
          <p className="form-control">Assign Device</p>
          </Col>
          <Col xs={8}>
          <Form.Select aria-label="Default select example" name={'Floor'+props.floorNumber+'Room'+props.roomNumber+'MachineAssignDevice'+props.machineNumber} required>
          <option></option>
          <option value="PAC001">PAC001</option>
          <option value="PAC002">PAC002</option>
          <option value="PAC003">PAC003</option>
        </Form.Select>
          </Col>
        </Row>
     
        <Row>
          <Col xs={4}>
          <p className="form-control">Machine Type</p>
          </Col>
          <Col xs={8}>
          <Form.Select aria-label="Default select example" name={'Floor'+props.floorNumber+'Room'+props.roomNumber+'MachineType'+props.machineNumber} required>
          <option></option>
          <option value="1 tonn">1 tonn</option>
          <option value="2 tonn">2 tonn</option>
          <option value="3 tonn">3 tonn</option>
        </Form.Select>
          </Col>
        </Row>
     
    
        
      </div>
      </Col>
        </>
    )
}

export default MachineCard
