import React from 'react'
import { Col,Dropdown,Form, Row} from 'react-bootstrap'
import '../css/MachineCard.css'

function MachineCard() {
    return (
        <>
      
            <Col xs={3}>
            <div className="machineCard">
     
         
    
        {/* <div className="dropdown">
          <a
            className="btn btn-default dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Machine
          </a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <a className="dropdown-item" href="#">
                AC1
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                AC2
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                AC3
              </a>
            </li>
          </ul>
        </div> */}
        <Row>
          <Col xs={4}>
          <p className="form-control">Assign Machine</p>
          </Col>
          <Col xs={8}>
          <Form.Select aria-label="Default select example" required>
          <option></option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
          </Col>
        </Row>
     
        <Row>
          <Col xs={4}>
          <p className="form-control">Device Type</p>
          </Col>
          <Col xs={8}>
          <Form.Select aria-label="Default select example" required>
          <option></option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
          </Col>
        </Row>
     
    
        
      </div>
      </Col>
        </>
    )
}

export default MachineCard
