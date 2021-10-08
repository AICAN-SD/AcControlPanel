import React from 'react'
import '../css/FloorLayout.css'
import { useEffect, useState } from 'react';
import { Row ,Col} from 'react-bootstrap';
import AddMachineButton from './AddMachineButton'
import '../css/MachineCard.css'

function RoomLayout() {
    const [machine, setMachine] = useState(1);
    const [machineArray, setMachineArray] = useState([]);
  
    return (
        <div>
            <div className="rectangle">
            <Row>
                <Col xs={2}>
                <AddMachineButton name='Add Machine' onClick={setMachine} onC={setMachineArray}></AddMachineButton>

                </Col>
                <Col xs={10}>
                <input className="form-control ac" placeholder="Room Name" required />
                </Col>
            </Row>
           
        
           <Row>
           {machineArray}
           </Row>
          
        
            </div>
        </div>
    )
}

export default RoomLayout;
