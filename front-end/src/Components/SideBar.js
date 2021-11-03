import React,{useState} from 'react'
import '../css/SideBar.css';
import {Accordion} from "react-bootstrap"

function SideBar1() {
const [drop,setDrop] = useState(false)

function btnClick(){
  setDrop(false)
  document.getElementsByClassName("sidebar")[0].classList.toggle("open");
};

function dropdown(){
  setDrop(!drop)
}

    return (
        <div>
         
            <div className="sidebar">
            <div className="logo-details">
          <div className="logo_name">AC Monitor</div>
          <i className="bx bx-menu" onClick={btnClick} id="btn" />
        </div>
        <ul >
          <li>
            <a href="/ControlPanel">
              <i className="bx bx-shield-quarter" />
              <span className="links_name">Control Panel</span>
            </a>
            <span className="tooltip">Control Panel</span>
          </li>
          <li>
            <a href="/">
              <i className="bx bx-grid-alt" />
              <span className="links_name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li >
            <a onClick={dropdown} >
              <i className="bx bx-cog" />
              <span className="links_name">Settings {drop?"▲":"▼"}</span>
            </a>
            <span className="tooltip">Settings({drop?"Show Less":"ShowMore"})</span>
          </li>
          {drop && <>
            <li>
            <a href="/Schedules">
              <i className="far fa-calendar"/>
              <span className="links_name">ScheduleProfiles</span>
            </a>
            <span className="tooltip">Schedule Profiles</span>
          </li>
          <li>
            <a href="/LayoutCreation">
              <i className="bx bx-user" />
              <span className="links_name">Create Profile</span>
            </a>
            <span className="tooltip">Create Profile</span>
          </li>
         
          <li>
            <a href="/CreateMachine">
              <i className="bx bxs-save" />
              <span className="links_name">CreateMachine</span>
            </a>
            <span className="tooltip">CreateMachine</span>
          </li>
          </>}
         
        </ul>
      </div>
        </div>
    )
}

export default SideBar1
