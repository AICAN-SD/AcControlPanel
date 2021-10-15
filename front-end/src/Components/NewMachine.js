import React, { useState } from 'react'
import {Form,Button} from "react-bootstrap"

function NewMachine({cpu}) {
    const [name,setName] = useState("")
    const [pw,setPw] = useState(0)
    const [capacity,setCapacity] = useState(0)
    

   function submitHandler(e){
    e.preventDefault() 
   }
    return (
        <div style={{paddingLeft:"40px"}}>
        <Form onSubmit={submitHandler}>
        <h5>Machine Name:</h5>
        <input
         value={name}
         onChange={(e) => setName(e.target.value)}
         type="text"
         placeholder=""
       /><br/>
       <h5>Power Rating:</h5>
        <input
        type="number"
        onChange={(e)=>setPw(e.target.value)}
        value={pw}
       /><input style={{width:"70px",textAlign:"center"}} type="text" value="Watt" disabled/><br/>
       <h5>Capacity:</h5>
        <input
        type="number"
        onChange={(e)=>setCapacity(e.target.value)}
        value={capacity}
       /><input style={{width:"70px",textAlign:"center"}} type="text" value="Ton" disabled/><br/><br/>
            <Button type="submit">Create</Button>
        </Form>
        </div>
    )
}

export default NewMachine
