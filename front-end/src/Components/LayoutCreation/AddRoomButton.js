import React from 'react'
import '../../css/AddFloorButton.css'
import '../../css/FloorLayout.css'
import RoomLayout from './RoomLayout'


function AddRoomButton(props) {
    function onClick(){
       var setRoom= props.onClick
       var setRoomc= props.onC
       setRoom(props.counter+1);
       setRoomc((oldArray) => [...oldArray,<RoomLayout devices={props.devices} del={props.del} roomData={props.roomData} key={props.counter+1} setMachines={props.setMachines} names={props.names} floorNumber={props.floorNumber} counter={props.counter+1} roomNumber={props.roomNumber+1}></RoomLayout>]);
    }
    return (

     
    
                <button type="button" className="btn1" onClick={onClick}>
                     <i className="fas fa-door-closed fa-1.5x" />
                {props.name}
                </button>
     
    )
}

export default AddRoomButton;

