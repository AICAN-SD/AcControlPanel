import React from 'react'
import '../css/FloorLayout.css'
import { useEffect, useState } from 'react';
import { Row ,Col} from 'react-bootstrap';
import AddMachineButton from './AddMachineButton'
import '../css/MachineCard.css'
import MachineCard from './MachineCard'


function RoomLayout(props) {
    const [machine, setMachine] = useState(1);
    const [isRoomData, setIsRoomData] = useState(false);
    const [machineArray, setMachineArray] = useState([]);
    useEffect(()=>{

        console.log(props.roomData)
        if(props.roomData!==null){

            setIsRoomData(true)
 
            props.roomData.machines.forEach(function (machine, i) {

                setMachine(prevRoom=>prevRoom+1);
                setMachineArray((oldArray) => [...oldArray, <MachineCard devices={props.devices} machineData={machine} key={i} setMachines={props.setMachines} counter={i+1} floorNumber={props.floorNumber} roomNumber={props.roomNumber} machineNumber={i+1} names={props.names} clickHandler={clickHandler} ></MachineCard>]);
              });
        }
    },[])
    function clickHandler(e,bool,oldval){
        e.preventDefault()
        console.log(oldval)
     
        const value = e.target.value
        console.log(value+" "+e.target.name)
        props.setMachines(prev=>{
            let i=0;
            for(let j=0;j<prev.length;j++){
                if(prev[j].value === value){
                    if(prev[j].name !== e.target.name){
                    alert(`${value} exists`);
                    if(!bool){
                        e.target.value=''
                    }else{
                        e.target.value=oldval

                    }
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
  
    return (
        <div>
            <div className="rectangle">
            <Row>
                <Col xs={2}>
                <AddMachineButton devices={props.devices} name='Add Machine' setMachines={props.setMachines} names={props.names} counter={machineArray.length} onClick={setMachine} onC={setMachineArray} floorNumber={props.floorNumber} roomNumber={props.roomNumber} machineNumber={machine} editMachineArray={machineArray} clickHandler={clickHandler}></AddMachineButton>

                </Col>
                <Col xs={10}>
                    {isRoomData?<input name={'Floor'+props.floorNumber+'RoomName'+props.roomNumber} defaultValue={props.roomData.roomName} className="form-control ac" placeholder="Room Name" required />:<input name={'Floor'+props.floorNumber+'RoomName'+props.roomNumber} className="form-control ac" placeholder="Room Name" required />}
                </Col>
            </Row>
           
        
           <Row>
           {machineArray}
           </Row>
          
        
            </div>
        </div>
    )
}

export default RoomLayout;
