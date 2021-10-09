import React from 'react'
import '../css/FloorLayout.css'
import { useEffect, useState } from 'react';
import ControlPanelMachineCard from './ControlPanelMachineCard';
import { Row } from 'react-bootstrap';
import axios from 'axios';



function ControlPanel() {
    const [floor, setFloor] = useState();
    const [room, setRoom] = useState();
    const [machine, setMachine] = useState();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/machines').then((response)=>{
            console.log(response.data)
            var data=response.data;
            var floors=data[0]
            var rooms=data[1]
            var machines=data[2]
            for(var x in floors){
              var floorId=floors[x].FloorId;
              console.log(floors[x].FloorName)
              for (var y in rooms){
                  if(floorId===rooms[y].floor){
                  var roomId=rooms[y].RoomId;
                  console.log(rooms[y].RoomName)
                  for (var z in machines){
                    if(roomId===machines[z].room){
                    var machineId=machines[z].MachineId;
                    console.log(machines[z].MachineType)
                    console.log(machines[z].MachineName)
                    }
                }
                  }
              }
            }
        })
      });
    return (
        <div className='rectangle'>
              <strong className='ac'> Floor 1</strong>
             <div className='rectangle'>
            <strong className='ac'> Room 1</strong>
           
                <Row >
                  
                <ControlPanelMachineCard></ControlPanelMachineCard>
                <ControlPanelMachineCard></ControlPanelMachineCard>
                <ControlPanelMachineCard></ControlPanelMachineCard>
                <ControlPanelMachineCard></ControlPanelMachineCard>
                </Row>
                </div>
     
        </div>
    )
}

export default ControlPanel
