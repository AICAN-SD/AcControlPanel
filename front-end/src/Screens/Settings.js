import React, { useState,useEffect} from "react";
import axios from "axios";
import {Tabs,Tab} from "react-bootstrap"
import FloorProfiles  from "../Components/FloorProfiles";
import RoomProfiles from "../Components/RoomProfiles";
import MachineProfiles from "../Components/MachineProfiles";
import '../css/profile.css';

function Settings() {
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
    <div className="panel panel-default pan" >
      <h1 style={{paddingLeft:"20px"}}>Create Profile:</h1>
      <Tabs defaultActiveKey="floor" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="floor" title="Floor Profile">
      <FloorProfiles onDelete={onDeleteFloor} profiles={floorProfiles} floors={floorData} />
        </Tab>
        <Tab  eventKey="room" title="Room Profile">
        <RoomProfiles profiles={roomProfiles} onDelete={onDeleteRoom} rooms={roomData}/>
        </Tab>
        <Tab eventKey="machine" title="Machine Profile">
        <MachineProfiles profiles={machineProfiles} onDelete={onDeleteMachine} machines={machineData} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Settings;
