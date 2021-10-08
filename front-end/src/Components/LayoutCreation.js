import React, { Component } from 'react'
import Button from './AddFloorButton'
import { useEffect, useState } from 'react';
import { Form, Row ,Col} from 'react-bootstrap';
import '../css/AddFloorButton.css';


function LayoutCreation() {
    const [floor, setFloor] = useState(1);
    const [isSave, setIsSave] = useState(false);
    const [floorArray, setFloorArray] = useState([]);
  
    return (
        <>
        <div style={{padding:'20px'}}>
            <Form>
            <Row>
                <Col xs={2}>
                <Button name='Add Floor' onClick={setFloor} onC={setFloorArray} save={setIsSave}></Button>

                </Col>
                <Col xs={10}>
                <input className="ac form-control" placeholder="Profile Name" required />
                </Col>
            </Row>
           <Row>
           {floorArray}
           </Row>
        <div id='saveDiv'>
           { isSave && <button id='saveBut' type='submit' style={{float:'right'}} className='btn btn-default'>Save</button>}
        </div>
        </Form>
        </div>
        </>
    )
}

export default LayoutCreation
