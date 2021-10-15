import React,{useState,useEffect} from 'react'
import {Button ,Row,Col} from "react-bootstrap";
import NewMachine from '../Components/NewMachine';
import EditMachine from '../Components/EditMachine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

function CreateMachine() {
    const [form,setForm] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [devices,setDevices] = useState([])
    const [cpu,setCpu] = useState(6.5)

    useEffect(()=>{
        const data =async ()=>await axios.get('http://127.0.0.1:8000/api/devices/')
        .then(res=>{
            setDevices(res.data)
            setCpu(res.data[0].costperunit)
        })
        .catch(e=>{
            console.log(e)
        })
        data()
    },[])
    function clickHandler(){
        setForm(!form)
    }
    function update(id){
        setEditForm(true)
    }
    function back(){
        setEditForm(false)
    }
    return (
        <div style={{paddingLeft:"40px"}}>
            <label >Cost/unit:</label> <input
            style={{width:"60px"}}
        type="number"
        onChange={(e)=>setCpu(e.target.value)}
        step=".01"
        value={cpu}
       />
            {!editForm && <>
            <Button onClick={clickHandler} style={{float:"right"}}> {form?"Back":"+ Create New"}</Button><br/><br/><br/>
            {!form && 
            <>
            {devices.map(device=>{
                return <div style={{margin:"10px",padding:"20px",borderRadius:"10px",border: '1px solid black'}}>
                   <h2>{device.name}</h2> 
                   <h5 style={{display:"inline"}}>Capacity: {device.capacity} Ton</h5>
                   <Button style={{float:"right"}} variant="clear" onClick={()=>update(1)} ><FontAwesomeIcon icon={faEdit} style={{color:"blue"}} size="lg"/></Button>
                   <Button style={{float:"right"}} variant="clear" ><FontAwesomeIcon icon={faTrash} style={{color:"red"}} size="lg"/></Button><br/>
                   <h5>Power Rating: {device.powerRating} Watt</h5>
                </div>
            })}
             </>}
             {form && <NewMachine cpu={cpu}/>} 
             </>}    
             {editForm &&<> <Button onClick={back} style={{float:"right"}}>Cancel</Button><br/><EditMachine/></>}   
        </div>
    )
}

export default CreateMachine
