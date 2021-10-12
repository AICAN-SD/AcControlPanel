import React from "react";
import "../css/FloorLayout.css";
import '../css/ControlPanel.css'
import { useEffect, useState } from "react";
import ControlPanelMachineCard from "./ControlPanelMachineCard";
import { Row,Dropdown,Col } from "react-bootstrap";
import axios from "axios";
import SwitchButton from "./SwitchButton";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function ControlPanel() {
  const [data, setData] = useState([]);
  const [floorProfile,setFloorProfile]=useState([])
  const [roomProfile,setRoomProfile]=useState([])
  const [machineProfile,setMachineProfile]=useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/machines").then((response) => {
      console.log(response.data);
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
    });
  }, []);

  function submitHandler(id){
    axios.get(`http://127.0.0.1:8000/api/profile/${id}`).then((response) => {
      console.log(response.data);
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
    }).catch(e=>{
      console.log(e);
    })
  }
  function MachineToggle(id){
    axios.get(`http://127.0.0.1:8000/api/machine/${id}`)
    .then(res=>{
      console.log(res.data)
    }).catch(e=>{
      console.log(e)
    })
  }
  return (
    <div>
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
  {floorProfile!== undefined && floorProfile.map((floor, index) => {
    console.log(floor.data.profName)
        return (
        <>
      
          
           <ul href="#/action-1" onClick={(e)=>{e.stopPropagation();}}>
             <li >
             <Row>
               <Col xs={6}> { floor.data.profName}</Col>
               <Col><BootstrapSwitchButton checked={floor.status} onstyle="success" size="xs"/></Col>
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
  {roomProfile!== undefined && roomProfile.map((room, index) => {
    console.log(room.data.profName)
        return (
        <>
      
          
           <ul href="#/action-1" onClick={(e)=>{e.stopPropagation();}}>
           <Row>
               <Col> { room.data.profName}</Col>
               <Col> <BootstrapSwitchButton checked={room.status} onstyle="success" size="xs"/></Col>
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
  {machineProfile!== undefined && machineProfile.map((machine, index) => {
    console.log(machine.data.profName)
        return (
        <>
      
          
           <ul  onClick={(e)=>{e.stopPropagation();}}>
           <Row>
               <Col>{ machine.data.profName}</Col>
               <Col><BootstrapSwitchButton checked={machine.status} onstyle="success" size="xs"/></Col>
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
      {data.map((floor, index) => {
        return (
          <>
            <div className="rectangle">
              <strong className="ac"> {floor.floor}</strong>
              {floor.rooms !== undefined &&
                floor.rooms.map((room, indx) => {
                  return (
                    <>
                      <div className="rectangle">
                        <strong className="ac"> {room.roomName}</strong>

                        <Row>
                          {room.machines !== undefined &&
                            room.machines.map((machine, indxx) => {
                              return (
                                <>
                                  <ControlPanelMachineCard
                                    machineData={machine}
                                    floor={floor.floor}
                                  ></ControlPanelMachineCard>
                                </>
                              );
                            })}
                        </Row>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        );
      })}
    </div>
  );

  // <div className='rectangle'>
  //       <strong className='ac'> Floor 1</strong>
  //      <div className='rectangle'>
  //     <strong className='ac'> Room 1</strong>

  //         <Row >

  //         <ControlPanelMachineCard></ControlPanelMachineCard>
  //         <ControlPanelMachineCard></ControlPanelMachineCard>
  //         <ControlPanelMachineCard></ControlPanelMachineCard>
  //         <ControlPanelMachineCard></ControlPanelMachineCard>
  //         </Row>
  //         </div>

  // </div>
}

export default ControlPanel;
