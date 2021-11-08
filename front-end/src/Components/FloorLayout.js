import React from 'react'

import { useEffect, useState } from 'react';
import { Row ,Col} from 'react-bootstrap';
import AddRoomButton from './AddRoomButton';
import '../css/MachineCard.css'
import RoomLayout from './RoomLayout'


function FloorLayout(props) {
    const [room, setRoom] = useState(1);
    const [isFloorData, setIsFloorData] = useState(false);
    
    const [roomArray, setRoomArray] = useState([]);
    useEffect(()=>{

        if(props.floorData!==null && props.floorData!==undefined){
            setIsFloorData(true)
            props.floorData.rooms.forEach(function (room, i) {

            setRoom(prevRoom=>prevRoom+1);
            setRoomArray((oldArray) => [...oldArray,<RoomLayout devices={props.devices} roomData={room} key={i} setMachines={props.setMachines} names={props.names} floorNumber={props.floorNumber} roomNumber={i+1}></RoomLayout>]);
           
        });
        }
       
    },[])
  
    return (
        <div>
            <div className="rectangle">
            <Row>
                <Col xs={2}>
                <AddRoomButton devices={props.devices} roomData={null} name='Add Room' setMachines={props.setMachines} names={props.names} key={roomArray.length} counter={roomArray.length} onClick={setRoom} onC={setRoomArray} floorNumber={props.floorNumber} roomNumber={room}></AddRoomButton>

                </Col>
                <Col xs={10}>
                {(isFloorData) ?
                <input name={'FloorName'+props.floorNumber} defaultValue={props.floorData.floor} key={roomArray.length}  className="ac form-control" placeholder="Floor Name" required />: <input name={'FloorName'+props.floorNumber}  key={roomArray.length}  className="ac form-control" placeholder="Floor Name" required />}
                </Col>
            </Row>
        
           <Row>
           {roomArray}
           </Row>
      
            </div>
        </div>
    )
}

export default FloorLayout
