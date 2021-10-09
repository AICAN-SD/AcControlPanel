import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import TimeField from "react-simple-timefield";

function MachineSchedule() {
  const [startTime, setStartTime] = useState("00.00");
  const [endTime, setEndTime] = useState("00.00");
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setList([
      {
        id: 1,
        start: "09:00",
        end: "10.00",
        hrs: "hrs"
      },
      {
        id: 2,
        start: "11.00",
        end: "12.00",
        hrs: "hrs"
      }
    ]);
  }, []);
  function submitHandler(e) {
    e.preventDefault();
    console.log(name);
    console.log(list);
  }
  function addField() {
    setList([...list, { id: 3, start: startTime, end: endTime, hrs: "hrs" }]);
    setEndTime("00.00");
    setStartTime("00.00");
  }
  function onStartTimeChange(e) {
    setStartTime(e.target.value);
  }
  function onEndTimeChange(e) {
    setEndTime(e.target.value);
  }
 
    function onCheckChange(e){
      var value=e.target.value;
      if(items.includes(value)){
        setItems(items.filter(item => item!== value))
      }else{ 
        setItems(prevItem=>[...prevItem,value])
      }
     }
    
   
  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Label sm="2">Profile Name:</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder=""
        />
        <h4>Choose Machines:</h4>
        <h5>Floor1-Room1:</h5>
        <Form.Check type="checkbox" onChange={(e) => onCheckChange(e)} value='Floor1Room1Machine1' label="Machine 1" />
        <Form.Check type="checkbox" onChange={(e) => onCheckChange(e)} value='Floor1Room1Machine2' label="Machine 2" />
        <h5>Floor1-Room2:</h5>
        <Form.Check type="checkbox" onChange={(e) => onCheckChange(e)} value='Floor1Room2Machine1' label="Machine 1" />
        <Form.Check type="checkbox" onChange={(e) => onCheckChange(e)} value='Floor1Room2Machine2' label="Machine 2" />
        <h5>Floor2-Room1:</h5>
        <Form.Check type="checkbox" onChange={(e) => onCheckChange(e)} value='Floor2Room1Machine1' label="Machine 1" />
        <Form.Check type="checkbox" onChange={(e) => onCheckChange(e)} value='Floor2Room1Machine2' label="Machine 2" />
         <Form.Label sm="2">Start Time:</Form.Label>
        <TimeField
          style={{ width: "80px", margin: "5px" }}
          value={startTime}
          onChange={onStartTimeChange}
        />
        <Form.Label sm="2">End Time:</Form.Label>
        <TimeField
          style={{ width: "80px", margin: "5px" }}
          value={endTime}
          onChange={onEndTimeChange}
        />

        <Button onClick={addField} style={{ margin: "5px" }} variant="primary">
          Add Field
        </Button>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Running Time</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {list.map((x) => {
              return (
                <tr>
                  <th scope="row">{x.id}</th>
                  <td>{x.start}</td>
                  <td>{x.end}</td>
                  <td>{x.hrs}</td>
                  <td>delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default MachineSchedule;
