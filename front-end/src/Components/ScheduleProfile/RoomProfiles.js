import React,{useState} from 'react'
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import RoomSchedule from './RoomSchedule'
import EditRoomSchedule from './EditRoomSchedule';

function RoomProfiles({profiles,rooms,onDelete}) {
    const [form,setForm] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [rid,setRid] = useState(null)
    function clickHandler(){
        setForm(!form)
    }
    function update(id){
        setRid(id)
        setEditForm(true)
    }
    function back(){
        setEditForm(false)
        setRid(null)
    }
    return (
        <div style={{paddingLeft:"40px"}}>
            {!editForm && <>
            <Button onClick={clickHandler} style={{float:"right"}}> {form?"Back":"+ Create New"}</Button><br/><br/>
            {!form && 
            <>
            {profiles!==undefined && profiles.map(profile=>{
                return <div style={{margin:"10px",padding:"20px",borderRadius:"10px",border: '1px solid black'}} key={profile.id}>
                    <h3 style={{display:"inline"}}>{profile.data.profName}{' '}</h3>
                    <Button style={{float:"right"}} variant="clear"  onClick={()=>update(profile.id)}><FontAwesomeIcon icon={faEdit} style={{color:"blue"}} size="lg"/></Button>
                    <Button style={{float:"right"}} variant="clear" onClick={()=>onDelete(profile.id)}><FontAwesomeIcon icon={faTrash} style={{color:"red"}} size="lg"/></Button><br/>
                    </div>
            })}
            </>
            } 
            {form && <RoomSchedule rooms={rooms}/>}  
            </>}
            {editForm &&<> <Button onClick={back} style={{float:"right"}}>Cancel</Button><br/><EditRoomSchedule rooms={rooms} rid={rid} /></>}
        </div>
    )
}

export default RoomProfiles
