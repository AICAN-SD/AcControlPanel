import React, { Component,useEffect,useState } from 'react'
import '../css/AddFloorButton.css'
import '../css/FloorLayout.css'
import MachineCard from './MachineCard'
import axios from 'axios'


function AddMachineButton(props) {
    const [names,setNames] = useState([])
    const [machines,setMachines] = useState([])
    useEffect(()=>{
        const data2 =async ()=>await axios.get('http://127.0.0.1:8000/api/readcsv')
        .then(res=>{
            const x =JSON.parse(res.data)
            console.log(x)
            setNames(x);
        })
        .catch(e=>{
            console.log(e)
        })
        data2()
    },[])
    function clickHandler(e,index){
        e.preventDefault()
        const value = e.target.value
        console.log(e)
        console.log(value+" "+e.target.name)
        setMachines(prev=>{
            let i=0;
            for(let j=0;j<prev.length;j++){
                if(prev[j] === value){
                    alert(`${value} exits`);
                    i=1;
                    e.target.value=""
                    break;
                }  
            }
            if(i === 0){
                return [...prev,value]
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
       setRoomc((oldArray) => [...oldArray, <MachineCard key={props.counter} counter={props.counter} floorNumber={props.floorNumber} roomNumber={props.roomNumber} machineNumber={props.machineNumber} names={names} clickHandler={clickHandler}></MachineCard>]);
    }
    return (

                <button type="button" className="btn1" onClick={onClick}>
                     <i className="fas fa-door-closed fa-1.5x" />
                {props.name}
                </button>
      
    )
}

export default AddMachineButton;

