import React from 'react'
import { useEffect, useState } from "react";
import { Row,Dropdown,Col } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function NavBarDropDown() {

  const [floor,setFloor]=useState([])
  const [room,setRoom]=useState([])
  const [machine,setMachine]=useState([])
    useEffect(() => {
      }, []);
    return (
        <div>
               <div className="dropdown chooseProfile">
  <button className="btn btn-default dropdown-toggle chooseProfileBut" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   Choose 
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <ul>
    <li onClick={(e)=>{e.stopPropagation();}}>

  
    <Dropdown>
  <Dropdown.Toggle style={{border: 'none',background:'none',outline: 'none',color:'black'}}  id="dropdown-basic">
    Floor 
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <>
  {floor!== undefined && floor.map((floor, index) => {
   
        return (
        <div key={index}>
           <ul href="#/action-1" key={index} onClick={(e)=>{e.stopPropagation();}}>
             <li >
             <Row>
               <Col xs={6}> { floor.FloorName}</Col>
               <Col><BootstrapSwitchButton checked={floor.status} onstyle="success" size="xs" onChange={(e)=>{}}/></Col>
             </Row>
             </li>
            </ul>
         
        </div>
        );
      })}
    </>
  </Dropdown.Menu>
</Dropdown>
    </li>
    <li onClick={(e)=>{e.stopPropagation();}}>

  
    <Dropdown>
  <Dropdown.Toggle style={{border: 'none',background:'none',outline: 'none',color:'black'}}  id="dropdown-basic">
    Room 
  </Dropdown.Toggle>

  <Dropdown.Menu>
  {room!== undefined && room.map((room, index) => {
        return (
        <div key={index}>
        {room.rooms.map((r,i)=>{
          return <ul href="#/action-1" key={i} onClick={(e)=>{e.stopPropagation();}}>
          <Row key={r.RoomId} >
              <Col> { room.floor}-{r.RoomName}</Col>
              <Col> <BootstrapSwitchButton  checked={room.status} onstyle="success" size="xs" onChange={(e)=>{}}/></Col>
            </Row>
          </ul>
        })}  
        </div>
        );
      })}
  </Dropdown.Menu>
</Dropdown>
    </li>
    <li onClick={(e)=>{e.stopPropagation();}}>

  
    <Dropdown>
  <Dropdown.Toggle style={{border: 'none',background:'none',outline: 'none',color:'black'}}  id="dropdown-basic">
    Machine 
  </Dropdown.Toggle>

  <Dropdown.Menu>
  {machine!== undefined && machine.map((machine, index) => {
        return (
        <div key={index}>
        {machine.rooms.map((r,indx)=>{
          return <div key={indx}>
          {r.machines.map(m=>{
            return <ul key={m.MachineId}  onClick={(e)=>{e.stopPropagation();}}>
              <Row >
                <Col>{machine.floor}-{r.roomName}-{m.MachineName}</Col>
                <Col><BootstrapSwitchButton checked={machine.status} onstyle="success" size="xs" onChange={(e)=>{}}/></Col>
              </Row>
            </ul>
          })}
          </div>
        })}
        </div>
        );
      })}
  </Dropdown.Menu>
</Dropdown>
    </li>
   
    </ul>
  </div>
</div>
        </div>
    )
}

export default NavBarDropDown