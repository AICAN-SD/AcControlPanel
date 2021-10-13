import React, { useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import RoomSchedule from "../Components/RoomSchedule";
import MachineSchedule from "../Components/MachineSchedule";
import axios from "axios";
import FloorProfiles  from "../Components/FloorProfiles";
import RoomProfiles from "../Components/RoomProfiles";
import MachineProfiles from "../Components/MachineProfiles";
import '../css/profile.css';

function TimeSchedulerScreen() {
  const [floor, setFloor] = useState(true);
  const [room, setRoom] = useState(false);
  const [machine, setMachine] = useState(false);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [floorProfiles, setfloorProfiles] = useState([]);
  const [roomProfiles, setroomProfiles] = useState([]);
  const [machineProfiles, setmachineProfiles] = useState([]);

  useEffect(()=>{
    const getFloors = async ()=> await axios.get('http://127.0.0.1:8000/api/floors/')
    .then(res=>{
      setFloorData(res.data)
    }).catch(e=>{
      console.log(e)
    })
    
    const getRooms = async ()=> await axios.get('http://127.0.0.1:8000/api/rooms/')
      .then(res=>{
        setRoomData(res.data)
      }).catch(e=>{
        console.log(e)
      })
    
      const getMachines = async ()=> await axios.get('http://127.0.0.1:8000/api/machines/')
      .then(res=>{
        setMachineData(res.data.Data)
        setfloorProfiles(res.data.floorProfiles)
        setroomProfiles(res.data.roomProfiles)
        setmachineProfiles(res.data.machineProfiles)
      }).catch(e=>{
        console.log(e)
      })
      getMachines()
      getFloors()
      getRooms()

  },[])

  function floorHandler() {
    if (!floor) {
      setFloor(true);
      setRoom(false);
      setMachine(false);
    }
  }
  function roomHandler() {
    if (!room) {
      setFloor(false);
      setRoom(true);
      setMachine(false);
    }
  }
  function machineHandler() {
    if (!machine) {
      setFloor(false);
      setRoom(false);
      setMachine(true);
    }
  }

  function onDeleteFloor(id){
    const newP = floorProfiles.filter(profile=>{
      return profile.id!==id  
    })
    setfloorProfiles([...newP])
    axios.delete(`http://127.0.0.1:8000/api/deleteProf/${id}`)
    .catch(e=>{
      console.log(e)
    })
  }
  function onDeleteRoom(id){
    const newP = roomProfiles.filter(profile=>{
      return profile.id!==id  
    })
    setroomProfiles([...newP])
    axios.delete(`http://127.0.0.1:8000/api/deleteProf/${id}`)
    .catch(e=>{
      console.log(e)
    })
  }
  function onDeleteMachine(id){
    const newP = machineProfiles.filter(profile=>{
      return profile.id!==id  
    })
    setmachineProfiles([...newP])
    axios.delete(`http://127.0.0.1:8000/api/deleteProf/${id}`)
    .catch(e=>{
      console.log(e)
    })
  }
  return (
    <div className="panel panel-default pan">
      <link
        rel="stylesheet"
        href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
      />
      <div className="panel-heading panel-heading-nav panl">
      <h1 style={{paddingLeft:"20px"}}>Create Profile:</h1>
      <ul className="nav nav-tabs">
          <li className={floor?"active":""}>
            <a onClick={floorHandler} data-toggle="tab" className="prf1">
            
             Floor Profile
            
            </a>
          </li>
          <li className={room?"active":""}>
            <a onClick={roomHandler} data-toggle="tab" className="prf1">
      
          Room Profile
        
            </a>
          </li>
          <li className={machine?"active":""}>
          <a onClick={machineHandler} data-toggle="tab" className="prf1">
          
          Machine Profile
       
        </a>
          </li>
        </ul>
      
      <div >
        {floor && <FloorProfiles onDelete={onDeleteFloor} profiles={floorProfiles} floors={floorData} />}
       {room && <RoomProfiles profiles={roomProfiles} onDelete={onDeleteRoom} rooms={roomData}/>}
        {machine && <MachineProfiles profiles={machineProfiles} onDelete={onDeleteMachine} machines={machineData} />}
      </div>
    </div>
    </div>
  );
}

export default TimeSchedulerScreen;
