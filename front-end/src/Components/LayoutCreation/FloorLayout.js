import React from 'react'

import { useEffect, useState } from 'react';
import { CloseButton,Row ,Col} from 'react-bootstrap';
import AddRoomButton from './AddRoomButton';
import '../../css/MachineCard.css'
import RoomLayout from './RoomLayout'


function FloorLayout(props) {
    const [room, setRoom] = useState(0);
    const [isFloorData, setIsFloorData] = useState(false);
    
    const [roomArray, setRoomArray] = useState([]);
    
    function Del(e){
        e.preventDefault()
        var roomNumber=e.target.id.split('Room')[1]
        var floorRoom=e.target.id.split('Room')[0]
      
        setRoomArray(prev=>{return prev.filter(function(item,index){
            return item.key!=roomNumber
        }
        )
       
    })
  

      }
    useEffect(()=>{

        if(props.floorData!==null && props.floorData!==undefined){
            setIsFloorData(true)
          
            props.floorData.rooms.forEach(function (room, i) {
            setRoom(parseInt(room.roomId.split('RoomName')[1]));
            setRoomArray((oldArray) => [...oldArray,<RoomLayout del={Del} devices={props.devices} roomData={room} key={parseInt(room.roomId.split('RoomName')[1])} setMachines={props.setMachines} names={props.names} floorNumber={props.floorNumber} roomNumber={parseInt(room.roomId.split('RoomName')[1])}></RoomLayout>]);
           
        });
        }
       
    },[])
  
    return (
        <div>
            <div className="rectangle">
            {roomArray.length===0?<CloseButton className='closeBut' id={'Floor'+props.floorNumber} onClick={(e)=>props.del(e)}/>:null}

            <Row>
                <Col xs={2}>
                <AddRoomButton devices={props.devices} del={Del} roomData={null} name='Add Room' setMachines={props.setMachines} names={props.names} key={room} counter={room} onClick={setRoom} onC={setRoomArray} floorNumber={props.floorNumber} roomNumber={room}></AddRoomButton>

                </Col>
                <Col xs={10}>
                {(isFloorData) ?
                <input name={'FloorName'+props.floorNumber} defaultValue={props.floorData.floor} key={roomArray.length}  className="ac1 form-control" placeholder="Floor Name" required />: <input name={'FloorName'+props.floorNumber}  key={roomArray.length}  className="ac1 form-control" placeholder="Floor Name" required />}
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
