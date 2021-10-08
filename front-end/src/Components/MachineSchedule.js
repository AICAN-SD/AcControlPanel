import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import TimeField from "react-simple-timefield";

function MachineSchedule() {
  const [time, setTime] = useState("12:33");
  function onTimeChange(e) {
    setTime(e.target.value);
  }
  return (
    <div>
      <Form>
        <Form.Label sm="2">Profile Name:</Form.Label>
        <Form.Control type="text" placeholder="" />
        <h4>Choose Machines:</h4>
        <h5>Floor1-Room1:</h5>
        <Form.Check type="checkbox" label="Machine 1" />
        <Form.Check type="checkbox" label="Machine 2" />
        <h5>Floor1-Room2:</h5>
        <Form.Check type="checkbox" label="Machine 1" />
        <Form.Check type="checkbox" label="Machine 2" />
        <h5>Floor2-Room1:</h5>
        <Form.Check type="checkbox" label="Machine 1" />
        <Form.Check type="checkbox" label="Machine 2" />
      </Form>
      <Form.Label sm="2">Start Time:</Form.Label>
      <TimeField
        style={{ width: "80px", margin: "5px" }}
        value={time}
        onChange={onTimeChange}
      />
      <Form.Label sm="2">End Time:</Form.Label>
      <TimeField
        style={{ width: "80px", margin: "5px" }}
        value={time}
        onChange={onTimeChange}
      />

      <Button style={{ margin: "5px" }} variant="primary" type="submit">
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
          <tr>
            <th scope="row">1</th>
            <td>startTime</td>
            <td>endTime</td>
            <td>hrs</td>
            <td>edit delete</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>startTime</td>
            <td>endTime</td>
            <td>hrs</td>
            <td>edit delete</td>
          </tr>
        </tbody>
      </table>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </div>
  );
}

export default MachineSchedule;
