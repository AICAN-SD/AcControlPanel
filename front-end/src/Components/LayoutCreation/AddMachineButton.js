import React from 'react'
import '../../css/AddFloorButton.css'
import '../../css/FloorLayout.css'
import MachineCard from './MachineCard'


function AddMachineButton(props) {
   
   
    function onClick(){
       var setRoom= props.onClick
       var setRoomc= props.onC
       setRoom(props.counter+1);
       setRoomc((oldArray) => [...oldArray, <MachineCard del={props.del} devices={props.devices}  machineData={null} key={props.counter+1} setMachines={props.setMachines} counter={props.counter+1} floorNumber={props.floorNumber} disabled={false} roomNumber={props.roomNumber} machineNumber={props.counter+1} names={props.names} clickHandler={props.clickHandler}></MachineCard>]);
    }
    return (

                <button type="button" className="btn1" onClick={onClick}>
                     <i className="fas fa-door-closed fa-1.5x" />
                {props.name}
                </button>
      
    )
}

export default AddMachineButton;

