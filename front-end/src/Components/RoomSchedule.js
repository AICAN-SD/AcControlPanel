import React, { useState, useEffect } from "react";
import { Form, Button ,Row,Col} from "react-bootstrap";
import TimeField from "react-simple-timefield";
import axios from "axios"
import '../css/Schedule.css'


function RoomSchedule({rooms}) {
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);

  function submitHandler(e) {
    e.preventDefault()
    if(name === ''){return}
    if(list.length === 0){return}
    if(items.length ===0){return}
    const schedule={
      profName:name,
      timeSchedule:list,
      selectedRooms:items
    }
    console.log(schedule)
    axios.post('http://127.0.0.1:8000/api/RoomSchedule/',{data:schedule,headers: {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Accept': 'Token',
    "Access-Control-Allow-Origin": "*",
}
}).then(()=>{
  window.location.reload(false);
})
.catch(e=>{
  console.log(e)
})
  }
  function addField() {
    setList([...list, {start: startTime, end: endTime, hrs: "hrs" }]);
    setEndTime("00:00");
    setStartTime("00:00");
  }
  function onStartTimeChange(e) {
    setStartTime(e.target.value);
  }
  function onEndTimeChange(e) {
    setEndTime(e.target.value);
  }
  function onCheckChange(e){
    var value=e.target.id;
    if(items.includes(value)){
      setItems(items.filter(item => item!== value))
    }else{ 
      setItems(prevItem=>[...prevItem,value])
    }
   }
   function deleteHandler(index){
    list.splice(index,1);
    setList([...list]);
  }
  return (
    <div>
      <p>Profile Name</p>
      <Form>
      <Row>
          <Col xs="5"> 
          <Form.Control
         
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder=""
          required
        />
        </Col>
        </Row>
        <h4  className="title">Choose Rooms:</h4>
        <Row className="mainRow">
          {rooms.map((room,index)=>{
            return <Col key={index} className="mainCol" sm="3" xs="4">
            <h5 className='mainColTitle'>{room.floor}</h5>
            <Row>
            {room.rooms.map((x)=>{
              return<Col key={x.RoomId} sm="6"> <Form.Check type="checkbox" onChange={onCheckChange} id={x.RoomId} value={x.RoomName} label={x.RoomName} /></Col>
            })}
            </Row>
            </Col>
          })}
        </Row>
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
        <table className="table table-striped">
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
            {list.map((x,index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{x.start}</td>
                  <td>{x.end}</td>
                  <td>{x.hrs}</td>
                  <td><Button variant="danger" onClick={()=>deleteHandler(index)}>Delete</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button variant="primary" onClick={submitHandler}>
          Create
        </Button>
      </Form>
    </div>
  );
}

export default RoomSchedule;
