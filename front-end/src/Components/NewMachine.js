import React, { useState } from 'react'
import {Form,Button} from "react-bootstrap"
import axios from 'axios'

function NewMachine({cpu}) {
    const [name,setName] = useState("")
    const [pw,setPw] = useState(0)
    const [capacity,setCapacity] = useState(0)
    

   function submitHandler(e){
    e.preventDefault() 
    const data={
        name:name,
        power:pw,
        capacity:capacity,
        costperunit:cpu
    }
    axios.post('http://127.0.0.1:8000/api/devices/',{data:data,headers: {
        'Content-Type' : 'application/json; charset=UTF-8',
        'Accept': 'Token',
        "Access-Control-Allow-Origin": "*",
    }
   })
   .then(()=>{
       window.location.reload(false)
   })
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
         required
       /><br/>
       <h5>Power Rating:</h5>
        <input
        type="number"
        onChange={(e)=>setPw(e.target.value)}
        value={pw}
        required
       /><input style={{width:"70px",textAlign:"center"}} type="text" value="Watt" disabled/><br/>
       <h5>Capacity:</h5>
        <input
        type="number"
        onChange={(e)=>setCapacity(e.target.value)}
        value={capacity}
        required
       /><input style={{width:"70px",textAlign:"center"}} type="text" value="Ton" disabled/><br/><br/>
            <Button type="submit">Create</Button>
        </Form>
        </div>
    )
}

export default NewMachine
