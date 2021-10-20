import React, { Component,useEffect,useState } from 'react'
import '../css/AddFloorButton.css'
import '../css/FloorLayout.css'
import MachineCard from './MachineCard'
import axios from 'axios'


function AddMachineButton(props) {
    const [names,setNames] = useState([])
    const [machines,setMachines] = useState([])
    var setRoomc= props.onC
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
    function clickHandler(e){
        const value = e.target.value
        console.log(value+" "+e.target.name)
        setMachines([...machines,value])
        const newnames = names.filter(name=>{
          return name.MACHINE_ID !== value
        })
        setNames([...newnames])
        setRoomc(oldArray=>oldArray.filter(x=>{

        }))
      }
    function onClick(){
       var setRoom= props.onClick
       var setRoomc= props.onC
       setRoom(prevRoom=>prevRoom+1);
       setRoomc((oldArray,index) => [...oldArray, <MachineCard key={index} floorNumber={props.floorNumber} roomNumber={props.roomNumber} machineNumber={props.machineNumber} names={names} clickHandler={clickHandler}></MachineCard>]);
    }
    return (

                <button type="button" className="btn1" onClick={onClick}>
                     <i className="fas fa-door-closed fa-1.5x" />
                {props.name}
                </button>
      
    )
}

export default AddMachineButton;

