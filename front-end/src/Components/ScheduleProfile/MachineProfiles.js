import React,{useState} from 'react'
import { Button ,Row,Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import MachineSchedule from './MachineSchedule';
import EditMachineSchedule from './EditMachineSchedule';

function MachineProfiles({profiles,machines,onDelete}){
    const [form,setForm] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [mid,setMid] = useState(null)
    function clickHandler(){
        setForm(!form)
    }
    function update(id){
        setMid(id)
        setEditForm(true)
    }
    function back(){
        setEditForm(false)
        setMid(null)
    }
    return (
        <div style={{paddingLeft:"40px"}}>
            {!editForm && <>
            <Button onClick={clickHandler} style={{float:"right"}}> {form?"Back":"+ Create New"}</Button><br/><br/>
            {!form && <>
            {profiles.map(profile=>{
                return <div style={{margin:"10px",padding:"20px",borderRadius:"10px",border: '1px solid black'}} key={profile.id}>
                    <h3 style={{display:"inline"}}>{profile.data.profName}{' '}</h3>
                    <Button style={{float:"right"}} variant="clear"  onClick={()=>update(profile.id)}><FontAwesomeIcon icon={faEdit} style={{color:"blue"}} size="lg"/></Button>
                    <Button style={{float:"right"}} variant="clear" onClick={()=>onDelete(profile.id)}><FontAwesomeIcon icon={faTrash} style={{color:"red"}} size="lg"/></Button><br/>
                    </div>
            })}
            </>
            } 
            {form && <MachineSchedule machines={machines}/>}  
            </>}
             {editForm &&<> <Button onClick={back} style={{float:"right"}}>Cancel</Button><br/> <EditMachineSchedule machines={machines} mid={mid} /></>}
        </div>
    )
}

export default MachineProfiles
