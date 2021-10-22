import React,{useState,useEffect} from 'react'
import { Col,Dropdown,Form, Row} from 'react-bootstrap'
import '../css/MachineCard.css'
import axios from 'axios'

function MachineCard(props) {
  const [devices,setDevices] = useState([])

  useEffect(()=>{
    const data =async ()=>await axios.get('http://127.0.0.1:8000/api/devices/')
    .then(res=>{
        setDevices(res.data)
    })
    .catch(e=>{
        console.log(e)
    })
    data()
},[])


    return (
        <>
      
            <Col xs={3}>
            <div className="machineCard">
        <Row>
          <Col xs={4}>
          <p className="form-control">Assign Device</p>
          </Col>
          <Col xs={8}>
          <Form.Select onChange={(e)=>props.clickHandler(e,props.counter)} aria-label="Default select example" name={'Floor'+props.floorNumber+'Room'+props.roomNumber+'MachineAssignDevice'+props.machineNumber} required>
          <option></option>
          {props.names.map(name=>{
            return <option key={name.ID} value={name.MACHINE_ID}>{name.MACHINE_ID}</option>
          })}
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
          {devices.map(device=>{
            return  <option key={device.deviceId} value={device.name}>{device.name}</option>
          })}
        </Form.Select>
          </Col>
        </Row>
     
    
        
      </div>
      </Col>
        </>
    )
}

export default MachineCard