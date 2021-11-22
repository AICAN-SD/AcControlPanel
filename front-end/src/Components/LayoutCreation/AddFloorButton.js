import React from 'react'
import '../../css/AddFloorButton.css'
import '../../css/FloorLayout.css'
import FloorLayout from './FloorLayout'


function Button(props) {
    function onClick(){
       var setFloor= props.onClick
       var setFloorc= props.onC
       var setisSaveButVisible= props.setisSaveButVisible
      setFloor(props.counter+1)
     setFloorc(function (oldArray) { 
       return [...oldArray,<FloorLayout del={props.del} devices={props.devices} floorData={props.floorData} key={props.counter+1} setMachines={props.setMachines} names={props.names} floorNumber={props.counter+1}></FloorLayout>];
      });

      //to show save button
      setisSaveButVisible(true)
    }
    return (
      <button type="button" className="btn1" onClick={onClick}>
        <i className="fas fa-door-closed fa-1.5x" />
        {props.name}
      </button>
      
       
    )
}

export default Button

