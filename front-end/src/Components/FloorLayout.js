import React from 'react'

import { useEffect, useState } from 'react';
import { Row ,Col} from 'react-bootstrap';
import AddRoomButton from './AddRoomButton';
import '../css/MachineCard.css'

function FloorLayout(props) {
    const [room, setRoom] = useState(1);
    const [roomArray, setRoomArray] = useState([]);
  
    return (
        <div>
            <div className="rectangle">
            <Row>
                <Col xs={2}>
                <AddRoomButton name='Add Room' onClick={setRoom} onC={setRoomArray} floorNumber={props.floorNumber} roomNumber={room}></AddRoomButton>

                </Col>
                <Col xs={10}>
                <input name={'FloorName'+props.floorNumber} className="ac form-control" placeholder="Floor Name" required />
                </Col>
            </Row>
        
           <Row>
           {roomArray}
           </Row>
      
            </div>
        </div>
    )
}

export default FloorLayout
