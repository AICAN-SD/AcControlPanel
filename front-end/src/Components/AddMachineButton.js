import React, { Component,useEffect,useState } from 'react'
import '../css/AddFloorButton.css'
import '../css/FloorLayout.css'
import MachineCard from './MachineCard'
import axios from 'axios'


function AddMachineButton(props) {
   
   
    function onClick(){
       var setRoom= props.onClick
       var setRoomc= props.onC
       setRoom(prevRoom=>prevRoom+1);
       setRoomc((oldArray) => [...oldArray, <MachineCard devices={props.devices}  machineData={null} key={props.counter} setMachines={props.setMachines} counter={props.counter} floorNumber={props.floorNumber} roomNumber={props.roomNumber} machineNumber={props.machineNumber} names={props.names} clickHandler={props.clickHandler}></MachineCard>]);
    }
    return (

                <button type="button" className="btn1" onClick={onClick}>
                     <i className="fas fa-door-closed fa-1.5x" />
                {props.name}
                </button>
      
    )
}

export default AddMachineButton;

