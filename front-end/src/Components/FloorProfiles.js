import React,{Profiler, useState} from 'react'
import {Button ,Row,Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import FloorSchedule from "../Components/FloorSchedule";

function FloorProfiles({profiles,floors,onDelete}) {
    const [form,setForm] = useState(false)

    function clickHandler(){
        setForm(!form)
    }
    return (
        <div style={{paddingLeft:"40px"}}>
            <Button onClick={clickHandler} style={{float:"right"}}> {form?"Back":"+ Create New"}</Button><br/><br/><br/>
            
            {!form && 
            <Row>
            {profiles.map(profile=>{
                return <Col sm="3" xs="4" key={profile.id}>
                    <h3>{profile.data.profName}{' '}</h3>
                    <Button variant="light"><FontAwesomeIcon icon={faEdit} style={{color:"blue"}} size="lg"/></Button>
                    <Button variant="light" onClick={()=>onDelete(profile.id)}><FontAwesomeIcon icon={faTrash} style={{color:"red"}} size="lg"/></Button>
                    <h4>{(profile.status)?"ON":"OFF"}</h4>
                    </Col>
            })}
            </Row>
            } 
            {form && <FloorSchedule floors={floors}/>}  
        </div>
    )
}

export default FloorProfiles
