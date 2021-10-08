import React, { Component } from 'react'
import '../css/AddFloorButton.css'
import '../css/FloorLayout.css'
import MachineCard from './MachineCard'


function AddMachineButton(props) {
    function onClick(){
       var setRoom= props.onClick
       var setRoomc= props.onC
       setRoom(prevRoom=>prevRoom+1);
       setRoomc(oldArray => [...oldArray, <MachineCard floorNumber={props.floorNumber} roomNumber={props.roomNumber} machineNumber={props.machineNumber}></MachineCard>]);
    }
    return (

                <button type="button" className="btn1" onClick={onClick}>
                     <i className="fas fa-door-closed fa-1.5x" />
                {props.name}
                </button>
      
    )
}

export default AddMachineButton;

