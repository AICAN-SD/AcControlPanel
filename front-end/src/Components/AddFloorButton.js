import React, { Component } from 'react'
import '../css/AddFloorButton.css'
import '../css/FloorLayout.css'
import FloorLayout from './FloorLayout'


function Button(props) {
    function onClick(){
       var setFloor= props.onClick
       var setFloorc= props.onC
       var setIsSave= props.save
      setFloor(prevFloor=>prevFloor+1)
     setFloorc(function (oldArray) { 
       return [...oldArray,<FloorLayout key={props.counter} setMachines={props.setMachines} names={props.names} floorNumber={props.floorNumber}></FloorLayout>];
      });
     setIsSave(true)
    }
    return (
      <button type="button" className="btn1" onClick={onClick}>
        <i className="fas fa-door-closed fa-1.5x" />
        {props.name}
      </button>
      
       
    )
}

export default Button

