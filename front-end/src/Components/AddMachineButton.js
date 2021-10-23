import React, { Component,useEffect,useState } from 'react'
import '../css/AddFloorButton.css'
import '../css/FloorLayout.css'
import MachineCard from './MachineCard'
import axios from 'axios'


function AddMachineButton(props) {
    useEffect(()=>{
       
    },[])
    function clickHandler(e){
        e.preventDefault()
        const value = e.target.value
        console.log(value+" "+e.target.name)
        props.setMachines(prev=>{
            let i=0;
            for(let j=0;j<prev.length;j++){
                if(prev[j].value === value){
                    if(prev[j].name !== e.target.name){
                    alert(`${value} exists`);
                    e.target.value=""
                    }
                    i=1;
                    break;
                }  
            }
            if(i === 1){
                for(let j=0;j<prev.length;j++){
                    if(prev[j].name === e.target.name){
                        prev.splice(j,1)
                        break;
                    }  
                } 
            }
            else if(i===0){
                for(let j=0;j<prev.length;j++){
                    if(prev[j].name === e.target.name){
                            prev[j].value = value
                            i=1;
                        break;
                    }  
                }
            }
            console.log(prev)
            if(i === 0){
                return [...prev,{name:e.target.name,value:value}]
                }
                else{
                    return [...prev]
                }
        })
      }
    function onClick(){
       var setRoom= props.onClick
       var setRoomc= props.onC
       setRoom(prevRoom=>prevRoom+1);
       setRoomc((oldArray) => [...oldArray, <MachineCard key={props.counter} setMachines={props.setMachines} counter={props.counter} floorNumber={props.floorNumber} roomNumber={props.roomNumber} machineNumber={props.machineNumber} names={props.names} clickHandler={clickHandler}></MachineCard>]);
    }
    return (

                <button type="button" className="btn1" onClick={onClick}>
                     <i className="fas fa-door-closed fa-1.5x" />
                {props.name}
                </button>
      
    )
}

export default AddMachineButton;

