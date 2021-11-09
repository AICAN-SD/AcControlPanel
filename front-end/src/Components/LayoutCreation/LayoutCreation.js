import React, { Component } from 'react'
import Button from './AddFloorButton'
import { useEffect, useState } from 'react';
import { Form, Row ,Col} from 'react-bootstrap';
import '../../css/AddFloorButton.css'
import axios from 'axios'
import FloorLayout from './FloorLayout'


function formSave(e){
    e.preventDefault()
    var dictionary={}
 var data=e.target

        for(var x in data){
            var floorId;
            var obj=data[x]
            if(obj instanceof HTMLInputElement || obj instanceof HTMLSelectElement){
                dictionary[data[x].name]=data[x].value;
            
                }
        }
        
        if(dictionary!=={}){

            axios.post('http://127.0.0.1:8000/api/data',{data:dictionary,headers: {
            'Content-Type' : 'application/json; charset=UTF-8',
            'Accept': 'Token',
            "Access-Control-Allow-Origin": "*",
        }
        })
        .then(function (response) {
            window.location.href ='/ControlPanel'
        });
        
      
        }
}
function LayoutCreation() {
    const [floor, setFloor] = useState(1);
    const [isSaveButVisible, setisSaveButVisible] = useState(false);
    const [floorArray, setFloorArray] = useState([]);
    const [names,setNames] = useState([])
    const [machines,setMachines] = useState([])

    const [data, setData] = useState([]);

    const [room, setRoom] = useState(1);
    const [roomArray, setRoomArray] = useState([]);

    const [devices,setDevices] = useState([])

  
   

    useEffect(()=>{


        var nms=[]
        var macType=[]
       

        async function  apiCalls() {
            await axios.get('http://127.0.0.1:8000/api/readcsv')
        .then(res=>{
            const x =JSON.parse(res.data)
            console.log(x)
            setNames(x);
            nms=x;
        })
        .catch(e=>{
            console.log(e)
        });

        await axios.get('http://127.0.0.1:8000/api/devices/')
        .then(res=>{
            setDevices(res.data)
            macType=res.data
        })
        .catch(e=>{
            console.log(e)
        })

        await axios.get("http://127.0.0.1:8000/api/machines/").then((response) => {
            setData(response.data.Data);
            
                response.data.Data.forEach(function (floor, i) {
                    setisSaveButVisible(true)
                   

                    setFloor(prevFloor=>prevFloor+1)
                setFloorArray((oldArray)=> { 
                  return ([...oldArray,<FloorLayout devices={macType} floorData={null} setRoom={setRoom} setRoomArray={setRoomArray} room={room} roomArray={roomArray} floorData={floor} key={i} setMachines={setMachines} names={nms} floorNumber={i+1}></FloorLayout>])
                 });
          });
        });
             
        }
        
       

        apiCalls()
    
    },[])
  
    return (
        <>
        <div style={{padding:'20px'}}>
            <Form onSubmit={formSave}>
            <Row>
                <Col xs={2}>
                <Button name='Add Floor' devices={devices} key={floorArray.length} names={names} setMachines={setMachines} counter={floorArray.length} onClick={setFloor} onC={setFloorArray} setisSaveButVisible={setisSaveButVisible} floorNumber={floor}></Button>

                </Col>
               
            </Row>
           <Row>
           {floorArray}
           </Row>
        <div id='saveDiv'>
           { isSaveButVisible && <button id='saveBut'type='submit'  href='/ControlPanel' style={{float:'right'}} className='btn btn-default' >
              <i className="bx bx-grid-alt" />
              <span className="links_name">Save</span>
            </button>}
        </div>
        </Form>
        </div>
        </>
    )
}

export default LayoutCreation
