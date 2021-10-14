import React from 'react'
import { Row,Dropdown,Col } from "react-bootstrap";


import SwitchButton from "./SwitchButton";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function ControlPanelDropDown(props) {
  
    return (
        <div className="dropdown chooseProfile">
  <button className="btn btn-default dropdown-toggle chooseProfileBut" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   Choose Profile
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <ul>
    <li onClick={(e)=>{e.stopPropagation();}}>

  
    <Dropdown>
  <Dropdown.Toggle style={{border: 'none',background:'none',outline: 'none',color:'black'}}  id="dropdown-basic">
    Floor Profile
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <>
  {props.floorProfile!== undefined && props.floorProfile.map((floor, index) => {
   
        return (
        <>
      
          
           <ul href="#/action-1" onClick={(e)=>{e.stopPropagation();}}>
             <li >
             <Row>
               <Col xs={6}> { floor.data.profName}</Col>
               <Col><BootstrapSwitchButton checked={floor.status} onstyle="success" size="xs" onChange={(e)=>{props.submitHandler(e,floor.id)}}/></Col>
             </Row>
             </li>
            </ul>
         
        </>
        );
      })}
    </>
  </Dropdown.Menu>
</Dropdown>
    </li>
    <li onClick={(e)=>{e.stopPropagation();}}>

  
    <Dropdown>
  <Dropdown.Toggle style={{border: 'none',background:'none',outline: 'none',color:'black'}}  id="dropdown-basic">
    Room Profile
  </Dropdown.Toggle>

  <Dropdown.Menu>
  {props.roomProfile!== undefined && props.roomProfile.map((room, index) => {
    console.log(room)
        return (
        <>
      
          
           <ul href="#/action-1" onClick={(e)=>{e.stopPropagation();}}>
           <Row>
               <Col> { room.data.profName}</Col>
               <Col> <BootstrapSwitchButton checked={room.status} onstyle="success" size="xs" onChange={(e)=>{props.submitHandler(e,room.id)}}/></Col>
             </Row>
           </ul>
         
        </>
        );
      })}
  </Dropdown.Menu>
</Dropdown>
    </li>
    <li onClick={(e)=>{e.stopPropagation();}}>

  
    <Dropdown>
  <Dropdown.Toggle style={{border: 'none',background:'none',outline: 'none',color:'black'}}  id="dropdown-basic">
    Machine Profile
  </Dropdown.Toggle>

  <Dropdown.Menu>
  {props.machineProfile!== undefined && props.machineProfile.map((machine, index) => {
        return (
        <>
      
          
           <ul  onClick={(e)=>{e.stopPropagation();}}>
           <Row>
               <Col>{ machine.data.profName}</Col>
               <Col><BootstrapSwitchButton checked={machine.status} onstyle="success" size="xs" onChange={(e)=>{props.submitHandler(e,machine.id)}}/></Col>
             </Row>
           </ul>
         
        </>
        );
      })}
  </Dropdown.Menu>
</Dropdown>
    </li>
   
    </ul>
  </div>
</div>
    )
}

export default ControlPanelDropDown
