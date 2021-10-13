import React,{Profiler, useState} from 'react'
import {Button ,Row,Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import FloorSchedule from "../Components/FloorSchedule";
import EditFloorSchedule from './EditFloorSchedule';

function FloorProfiles({profiles,floors,onDelete}) {
    const [form,setForm] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [fid,setFid] = useState(null)

    function clickHandler(){
        setForm(!form)
    }
    function update(id){
        setFid(id)
        setEditForm(true)
    }
    function back(){
        setEditForm(false)
        setFid(null)
    }
    return (
        <div style={{paddingLeft:"40px"}}>
            {!editForm && <>
                <Button onClick={clickHandler} style={{float:"right"}}> {form?"Back":"+ Create New"}</Button><br/>
            {!form && 
            <Row>
            {profiles.map(profile=>{
                return <Col sm="3" xs="4" key={profile.id}>
                    <h3>{profile.data.profName}{' '}</h3>
                    <Button variant="light" onClick={()=>update(profile.id)}><FontAwesomeIcon icon={faEdit} style={{color:"blue"}} size="lg"/></Button>
                    <Button variant="light" onClick={()=>onDelete(profile.id)}><FontAwesomeIcon icon={faTrash} style={{color:"red"}} size="lg"/></Button>
                    <h4>{(profile.status)?"ON":"OFF"}</h4>
                    </Col>
            })}
            </Row>
            } 
            {form && <FloorSchedule floors={floors}/>}
            </>}
             {editForm &&<> <Button onClick={back} style={{float:"right"}}>Cancel</Button><br/> <EditFloorSchedule floors={floors} fid={fid} /></>}
        </div>
    )
}

export default FloorProfiles
