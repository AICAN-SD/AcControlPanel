import React from "react";

function SchedulingTable({ changeHandler, headers, data }) {
  return (
    <div>
      <form>
        <label for="cars">Choose Room Profile:</label>
        {"  "}
        <select onChange={changeHandler} id="cars" name="cars">
          {headers.map((x) => {
            return <option value={x.id}>{x.name}</option>;
          })}
        </select>
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
            {data.map((x) => {
              return (
                <tr>
                  <th scope="row">{x.id}</th>
                  <td>{x.startTime}</td>
                  <td>{x.endTime}</td>
                  <td>{x.hrs}</td>
                  <td>edit delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default SchedulingTable;
