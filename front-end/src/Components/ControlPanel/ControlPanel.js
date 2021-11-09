import React from "react";
import "../../css/FloorLayout.css";
import '../../css/ControlPanel.css'
import { useEffect, useState } from "react";
import ControlPanelMachineCard from "../ControlPanel/ControlPanelMachineCard";
import { Row } from "react-bootstrap";
import axios from "axios";
import ControlPanelDropDown from "../ControlPanel/ControlPanelDropDown";

function ControlPanel() {

  const [data, setData] = useState([]);
    
  const [floorProfile,setFloorProfile]=useState([])
  const [roomProfile,setRoomProfile]=useState([])
  const [machineProfile,setMachineProfile]=useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/machines/").then((response) => {
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
    });
  }, []);

  function submitHandler(e,id){
    if(e){
    axios.get(`http://127.0.0.1:8000/api/profile/${id}`).then((response) => {
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
    }).catch(e=>{
      console.log(e);
    })
  }else{
    axios.get('http://127.0.0.1:8000/api/profile/').then((response) => {
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
    }).catch(e=>{
      console.log(e);
    })

  }
  }
  function MachineToggle(id){
    axios.get(`http://127.0.0.1:8000/api/machine/${id}`)
    .then((response) => {
      console.log(response.data);
      setFloorProfile(response.data.floorProfiles)
      setRoomProfile(response.data.roomProfiles)
      setMachineProfile(response.data.machineProfiles)
      setData(response.data.Data);
    }).catch(e=>{
      console.log(e)
    })
  }
  return (
    <div id='MainDiv' >
      <ControlPanelDropDown floorProfile={floorProfile} roomProfile={roomProfile} machineProfile={machineProfile} submitHandler={submitHandler}></ControlPanelDropDown>
   
      {data.map((floor, index) => {
        return (
          <>
            <div className="rectangle" >
              <strong className="ac"  > {floor.floor}</strong>
              {floor.rooms !== undefined &&
                floor.rooms.map((room, indx) => {
                  return (
                    <>
                      <div className="">
                        <strong className="ac"> {room.roomName}</strong>

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

  
}

export default ControlPanel;
