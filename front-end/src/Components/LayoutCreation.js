import React, { Component } from 'react'
import Button from './AddFloorButton'
import { useEffect, useState } from 'react';
import { Form, Row ,Col} from 'react-bootstrap';
import '../css/AddFloorButton.css';
import axios from 'axios'

function formSave(e){
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
    console.log(response);
  });
}
}
function LayoutCreation() {
    const [floor, setFloor] = useState(1);
    const [isSave, setIsSave] = useState(false);
    const [floorArray, setFloorArray] = useState([]);
  
    return (
        <>
        <div style={{padding:'20px'}}>
            <Form onSubmit={formSave}>
            <Row>
                <Col xs={2}>
                <Button name='Add Floor' key={floorArray.length} counter={floorArray.length} onClick={setFloor} onC={setFloorArray} save={setIsSave} floorNumber={floor}></Button>

                </Col>
               
            </Row>
           <Row>
           {floorArray}
           </Row>
        <div id='saveDiv'>
           { isSave && <button id='saveBut' type='submit' style={{float:'right'}} className='btn btn-default' >Save</button>}
        </div>
        </Form>
        </div>
        </>
    )
}

export default LayoutCreation
