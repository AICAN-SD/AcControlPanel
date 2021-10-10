import React, { useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import FloorSchedule from "../Components/FloorSchedule";
import RoomSchedule from "../Components/RoomSchedule";
import MachineSchedule from "../Components/MachineSchedule";
import axios from "axios";

function TimeSchedulerScreen() {
  const [floor, setFloor] = useState(true);
  const [room, setRoom] = useState(false);
  const [machine, setMachine] = useState(false);
  const [floorData, setFloorData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [machineData, setMachineData] = useState([]);

  useEffect(()=>{
    const getFloors = async ()=>{
      await axios.get('http://127.0.0.1:8000/api/floors')
    .then(res=>{
      setFloorData(res.data)
    }).catch(e=>{
      console.log(e)
    })
    }
    const getRooms = async ()=>{
      await axios.get('http://127.0.0.1:8000/api/rooms')
      .then(res=>{
        setRoomData(res.data)
      }).catch(e=>{
        console.log(e)
      })
    }
    const getMachines = async ()=>{
      await axios.get('http://127.0.0.1:8000/api/machines')
      .then(res=>{
        setMachineData(res.data)
      }).catch(e=>{
        console.log(e)
      })
    }

    getFloors()
    getRooms()
    getMachines()
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
  return (
    <div>
      <h1 style={{ padding: "30px" }}>Create Profile:</h1>
      <div style={{ padding: "0px 30px", paddingBottom: "20px" }}>
        <Button onClick={floorHandler} variant={floor ? "info" : "danger"}>
          Floor Profile
        </Button>{" "}
        <Button onClick={roomHandler} variant={room ? "info" : "danger"}>
          Room Profile
        </Button>{" "}
        <Button onClick={machineHandler} variant={machine ? "info" : "danger"}>
          Machine Profile
        </Button>{" "}
      </div>
      <div style={{ padding: "0px 30px" }}>
        {floor && <FloorSchedule floors={floorData} />}
        {room && <RoomSchedule rooms={roomData} />}
        {machine && <MachineSchedule machines={machineData} />}
      </div>
    </div>
  );
}

export default TimeSchedulerScreen;
