import React from 'react'
import { Col } from 'react-bootstrap'
import '../css/ControlPanelMachineCard.css'

function ControlPanelMachineCard() {
    return (
        <Col xs={3}>
            <div className="ControlPanelMachineCard">
        <div className="row">
          <div className="col-sm-4" />
          <div className="col-sm-4">
            <h1 className="ac">
              <strong>AC 1</strong>
            </h1>{" "}
            <h4 className="num">PAC001</h4>
          </div>
          <div className="col-sm-4">
            {" "}
            <label className="switch" style={{ float: "right" }}>
              <input type="checkbox" />
              <span className="slider round">
                <i className="fa fa-on" />
              </span>
            </label>
          </div>
        </div>
        <div className="row" id="row1">
          <div className="col-sm-6">
            <i className="fas fa-sun fa-2x">
              <span className="sun">9:00 AM</span>
            </i>
          </div>
          <div className="col-sm-6">
            <i className="fas fa-moon fa-2x">
              <span className="moon">19:00 PM</span>
            </i>
          </div>
          <div className="row" id="row2">
            <div className="col-sm-4">
              <button
                type="button"
                className="btn-default btn"
                id="on"
                style={{ float: "right" }}
              >
                <i className="fa fa-clock" />
                <strong>On time</strong>{" "}
              </button>
            </div>
            <div className="col-sm-4">
              <button type="button" className="btn-default btn" id="of">
                <i className="fa fa-clock" />
                <strong>Off time</strong>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      </Col>   
       )
}

export default ControlPanelMachineCard
