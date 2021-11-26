import React from "react";
import "../../css/FloorLayout.css";
import '../../css/ControlPanel.css'
import { useEffect, useState } from "react";
import ControlPanelMachineCard from "../ControlPanel/ControlPanelMachineCard";
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import ControlPanelDropDown from "../ControlPanel/ControlPanelDropDown";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


function ControlPanel() {

  const [data, setData] = useState([]);
  const [factoryStatus, setFactoryStatus] = useState(false);
    
  const [floorProfile,setFloorProfile]=useState([])
  const [roomProfile,setRoomProfile]=useState([])
  const [machineProfile,setMachineProfile]=useState([])

  useEffect(() => {

  
  


    axios.get("http://127.0.0.1:8000/api/machines/").then((response) => {
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
      setFactoryStatus(response.data.macStatus)
    });
  }, []);

  function submitHandler(e,id){
    if(e){
    axios.get(`http://127.0.0.1:8000/api/profile/${id}`).then((response) => {
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
      setFactoryStatus(response.data.macStatus)
    }).catch(e=>{
      console.log(e);
    })
  }else{
    axios.get('http://127.0.0.1:8000/api/profile/').then((response) => {
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
      setFactoryStatus(response.data.macStatus)
    }).catch(e=>{
      console.log(e);
    })

  }
  }
  function FactoryToggle(e,fid,rid){
    var status;
    if(e){
    status=1
    }else{
      status=0
    }
    if(fid===undefined){
      fid='null'
    }
    if(rid===undefined){
      rid='null'
    }
    console.log(e)
    axios.get(`http://127.0.0.1:8000/api/factoryToggle/${status}/${fid}/${rid}`)
    .then((response) => {
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
      setFactoryStatus(response.data.macStatus)
    }).catch(e=>{
      console.log(e)
    })
  
  }
  function MachineToggle(id){
    axios.get(`http://127.0.0.1:8000/api/machine/${id}`)
    .then((response) => {
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
      setFactoryStatus(response.data.macStatus)
    }).catch(e=>{
      console.log(e)
    })
  }
  return (
    <div id='MainDiv' >
      <Row>
        <Col className="ac" id='FacTogBut' sm={6} >
      <strong >Factory   </strong><BootstrapSwitchButton onChange={(e)=>{FactoryToggle(e)}} checked={factoryStatus} size="sm" />
      </Col>
      <Col style={{float:'right'}} sm={6} id='DropDownBut'>
      <ControlPanelDropDown floorProfile={floorProfile} roomProfile={roomProfile} machineProfile={machineProfile} submitHandler={submitHandler}></ControlPanelDropDown>
   </Col>
   </Row>
      {data!==undefined && data.map((floor, index) => {
        return (
          <>
            <div className="rectangle" >
              <Row>
                <Col className="ac">
              <strong > {floor.floor}</strong>   <BootstrapSwitchButton onChange={(e)=>FactoryToggle(e,floor.floorId)} checked={floor.status}   size="sm" />
              </Col>
            

              </Row>
              {floor.rooms !== undefined &&
                floor.rooms.map((room, indx) => {
                  return (
                    <>
                      <Row>
                        <Col className="ac">
                        <strong > {room.roomName} </strong><BootstrapSwitchButton onChange={(e)=>FactoryToggle(e,floor.floorId,room.roomId)} checked={room.status} size="sm" />
                        </Col>


                        <Row>
                          {room.machines !== undefined &&
                            room.machines.map((machine, indxx) => {
                              return (
                                <>

                                  <ControlPanelMachineCard
                                      MachineToggle={MachineToggle}
                                    machineData={machine}
                                    floor={floor.floor} 
                                  ></ControlPanelMachineCard>
                                </>
                              );
                            })}
                        </Row>
                      </Row>
                    </>
                  );
                })}
            </div>
          </>
        );
      })}
    </div>
  );

  
}

export default ControlPanel;
