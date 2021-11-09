import React from 'react'
import '../../css/AddFloorButton.css'
import '../../css/FloorLayout.css'
import RoomLayout from './RoomLayout'


function AddRoomButton(props) {
    function onClick(){
       var setRoom= props.onClick
       var setRoomc= props.onC
       setRoom(prevRoom=>prevRoom+1);
       setRoomc((oldArray) => [...oldArray,<RoomLayout devices={props.devices}  roomData={props.roomData} key={props.counter} setMachines={props.setMachines} names={props.names} floorNumber={props.floorNumber} roomNumber={props.roomNumber}></RoomLayout>]);
    }
    return (

     
    
                <button type="button" className="btn1" onClick={onClick}>
                     <i className="fas fa-door-closed fa-1.5x" />
                {props.name}
                </button>
     
    )
}

export default AddRoomButton;
