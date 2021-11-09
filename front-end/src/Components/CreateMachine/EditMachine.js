import React, { useState,useEffect } from 'react'
import {Form,Button} from "react-bootstrap"
import axios from 'axios'

function EditMachine({cpu,mid}) {
   const [name,setName] = useState("")
    const [pw,setPw] = useState(0)
    const [capacity,setCapacity] = useState(0)

    useEffect(() => {
      if (mid!==null){
        const func =async ()=>axios.get(`http://127.0.0.1:8000/api/devices/${mid}`)
        .then(res=>{
          setName(res.data[0].name)
          setPw(res.data[0].powerRating)
          setCapacity(res.data[0].capacity)
        })
        func()
      }
    }, [])

    function submitHandler(e){
      e.preventDefault() 
      const data={
          name:name,
          power:pw,
          capacity:capacity,
          costperunit:cpu
      }
      axios.put(`http://127.0.0.1:8000/api/devices/${mid}`,{data:data,headers: {
          'Content-Type' : 'application/json; charset=UTF-8',
          'Accept': 'Token',
          "Access-Control-Allow-Origin": "*",
      }
     })
     .then(()=>{
         window.location.reload(false)
     })
  }
  return (<>
    {(mid!== null) && 
    <div style={{paddingLeft:"40px"}}>
    <Form onSubmit={submitHandler}>
      <br/>
    <h5>Machine Name:</h5>
    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
   
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
        <Button type="submit">Update</Button>
    </Form>
    </div>
    }
    {mid === null && <h2>Enter Valid Id To Update</h2>}
    </>
)
}

export default EditMachine
