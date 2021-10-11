import React from "react";
import "../css/FloorLayout.css";
import { useEffect, useState } from "react";
import ControlPanelMachineCard from "./ControlPanelMachineCard";
import { Row } from "react-bootstrap";
import axios from "axios";

function ControlPanel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/machines").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);
  return (
    <div>
      {data.map((floor, index) => {
        return (
          <>
            <div className="rectangle">
              <strong className="ac"> {floor.floor}</strong>
              {floor.rooms !== undefined &&
                floor.rooms.map((room, indx) => {
                  return (
                    <>
                      <div className="rectangle">
                        <strong className="ac"> {room.roomName}</strong>

                        <Row>
                          {room.machines !== undefined &&
                            room.machines.map((machine, indxx) => {
                              return (
                                <>
                                  <ControlPanelMachineCard
                                    machineData={machine}
                                    floor={floor.floor}
                                  ></ControlPanelMachineCard>
                                </>
                              );
                            })}
                        </Row>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        );
      })}
    </div>
  );

  // <div className='rectangle'>
  //       <strong className='ac'> Floor 1</strong>
  //      <div className='rectangle'>
  //     <strong className='ac'> Room 1</strong>

  //         <Row >

  //         <ControlPanelMachineCard></ControlPanelMachineCard>
  //         <ControlPanelMachineCard></ControlPanelMachineCard>
  //         <ControlPanelMachineCard></ControlPanelMachineCard>
  //         <ControlPanelMachineCard></ControlPanelMachineCard>
  //         </Row>
  //         </div>

  // </div>
}

export default ControlPanel;
