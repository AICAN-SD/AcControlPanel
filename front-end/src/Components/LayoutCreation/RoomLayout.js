import React from 'react'
import '../../css/FloorLayout.css'
import { useEffect, useState } from 'react';
import { Row,CloseButton ,Col} from 'react-bootstrap';

import AddMachineButton from './AddMachineButton'
import '../../css/MachineCard.css'
import MachineCard from './MachineCard'


function RoomLayout(props) {
    const [Machine, setMachine] = useState(0);
    const [isRoomData, setIsRoomData] = useState(false);
    const [machineArray, setMachineArray] = useState([]);
    useEffect(()=>{

        if(props.roomData!==null){

            setIsRoomData(true)
 
            props.roomData.machines.forEach(function (machine, i) {

                props.setMachines(prev=> {
                    return [...prev,{name:machine.MachineId,value:machine.MachineName}]
                  })
                setMachine(parseInt(machine.MachineId.split('Machine')[1]));
                setMachineArray((oldArray) => [...oldArray, <MachineCard del={Del} disabled={true}  devices={props.devices} machineData={machine} key={parseInt(machine.MachineId.split('Machine')[1])} setMachines={props.setMachines} counter={parseInt(machine.MachineId.split('Machine')[1])} floorNumber={props.floorNumber} roomNumber={props.roomNumber} machineNumber={parseInt(machine.MachineId.split('Machine')[1])} names={props.names} clickHandler={clickHandler} ></MachineCard>]);
              });
        }
    },[]);
    function Del(e){
        e.preventDefault()
        var machineNumber=e.target.id.split('Button')[1]
        var floorRoom=e.target.id.split('Button')[0]
        
      
        
        setMachineArray(prev=>{return prev.filter(function(item){
            return item.key!=machineNumber
        }
        )
       
    })
    props.setMachines(prev=>{
        for(let j=0;j<prev.length;j++){
           
                
            if(prev[j].name === floorRoom+'Machine'+ machineNumber){
                prev.splice(j,1)
                break;
            }  
        }
        return prev
    })

      }
    function clickHandler(e,bool,oldval,oldName){
        e.preventDefault()
        var reNamed=e.target.name.split('AssignDevice')
        var reNamedString=reNamed[0]+reNamed[1]
        const value = e.target.value
        props.setMachines(prev=>{
            let i=0;

        if(value!==''){
            for(var j=0;j<prev.length;j++){
                if(prev[j].value === value){
                    if(prev[j].name !== reNamedString){
                    alert(`${value} exists`);
                    
                        e.target.value=oldval

                    
                    }
                    i=1;
                    break;
                }
            }
            if(i===0){
                for(let j=0;j<prev.length;j++){
                    if(prev[j].name === reNamedString){
                            prev[j].value = value
                            i=1;
                        break;
                    }else if(prev[j].name===reNamedString){

                        prev.splice(j,1)
    
                    }  
                }
            }
        }else{
            for(let j=0;j<prev.length;j++){
                
                if(prev[j].name === reNamedString){
                    prev.splice(j,1)
                    break;
                }  
            }
        }
            if(i === 0 && value!==''){
                return [...prev,{name:reNamedString,value:value}]
                }
                else{
                    return [...prev]
                }
        })
        e.target.blur();
      }
  
    return (
        <div>
            <div className="rectangle">

          {machineArray.length===0?<CloseButton  className='closeBut' id={'Floor'+props.floorNumber+'Room'+props.roomNumber} onClick={(e)=>props.del(e)}/> :null}

            <Row>
                <Col xs={2}>
                <AddMachineButton del={Del} devices={props.devices} name='Add Machine' setMachines={props.setMachines} names={props.names} counter={Machine} onClick={setMachine} onC={setMachineArray} floorNumber={props.floorNumber} roomNumber={props.roomNumber} machineNumber={Machine} editMachineArray={machineArray} clickHandler={clickHandler}></AddMachineButton>
             
                </Col>
                <Col xs={10}>
                    {isRoomData?<input  name={'Floor'+props.floorNumber+'RoomName'+props.roomNumber} defaultValue={props.roomData.roomName} className="form-control ac1" placeholder="Room Name" required />:<input name={'Floor'+props.floorNumber+'RoomName'+props.roomNumber} className="form-control ac1" placeholder="Room Name" required />}
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
