import React, { useState } from "react";
import { Button } from "react-bootstrap";
import FloorSchedule from "../Components/FloorSchedule";
import RoomSchedule from "../Components/RoomSchedule";
import MachineSchedule from "../Components/MachineSchedule";

function TimeSchedulerScreen() {
  const [floor, setFloor] = useState(true);
  const [room, setRoom] = useState(false);
  const [machine, setMachine] = useState(false);

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
      <div style={{ padding: "30px" }}>
        <Button onClick={floorHandler} variant={floor ? "info" : "danger"}>
          Floor
        </Button>{" "}
        <Button onClick={roomHandler} variant={room ? "info" : "danger"}>
          Room
        </Button>{" "}
        <Button onClick={machineHandler} variant={machine ? "info" : "danger"}>
          Machines
        </Button>{" "}
      </div>
      <div style={{ padding: "0px 30px" }}>
        {floor && <FloorSchedule />}
        {room && <RoomSchedule />}
        {machine && <MachineSchedule />}
      </div>
    </div>
  );
}

export default TimeSchedulerScreen;
