import React,{useState,useEffect} from 'react'
import { Col,Dropdown,Form, Row} from 'react-bootstrap'
import '../../css/MachineCard.css'

function MachineCard(props) {
  const [isMachineData,setIsMachineData] = useState(false)
  const [oldVal,setOldVal] = useState()
  const [oldName,setOldName] = useState()

  useEffect(()=>{

    if(props.machineData!==null){
      setIsMachineData(true)
    }
    
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
          <Form.Select onFocus={(e)=>{setOldVal(e.target.value);setOldName(e.target.name);}} onChange={(e)=>{props.clickHandler(e,isMachineData,oldVal,oldName)}} aria-label="Default select example" name={'Floor'+props.floorNumber+'Room'+props.roomNumber+'MachineAssignDevice'+props.machineNumber} required>
          <option></option>
          {props.names.map(name=>{
            return <option key={name.ID} selected={isMachineData?(props.machineData.MachineName===name.MACHINE_ID?true:null):null} value={name.MACHINE_ID}>{name.MACHINE_ID}</option>
          })}
        </Form.Select>
          </Col>
        </Row>
     
        <Row>
          <Col xs={4}>
          <p className="form-control">Machine Type</p>
          </Col>
          <Col xs={8}>
          <Form.Select aria-label="Default select example"  name={'Floor'+props.floorNumber+'Room'+props.roomNumber+'MachineType'+props.machineNumber} required>
          <option></option>
          {props.devices.map(device=>{
            return  <option key={device.deviceId} selected={isMachineData?(props.machineData.MachineType===device.name?true:null):null} value={device.name}>{device.name}</option>
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