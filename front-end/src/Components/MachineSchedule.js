import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import SchedulingTable from "./SchedulingTable";
import { datax, datay } from "../sampleData";

function MachineSchedule() {
  const headers = [
    {
      id: 1,
      name: "Machine1"
    },
    {
      id: 2,
      name: "Machine2"
    },
    {
      id: 3,
      name: "Machine3"
    },
    {
      id: 4,
      name: "Machine4"
    }
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(datax);
  }, []);

  function changeHandler(e) {
    if (e.target.value === "1") {
      setData(datax);
    } else {
      setData(datay);
    }
  }

  return (
    <SchedulingTable
      data={data}
      headers={headers}
      changeHandler={changeHandler}
    />
  );
}

export default MachineSchedule;
