import React from 'react'
import '../css/SideBar.css';

function SideBar1() {

function btnClick(){
  document.getElementsByClassName("sidebar")[0].classList.toggle("open");
};

    return (
        <div>
         
            <div className="sidebar">
            <div className="logo-details">
          <div className="logo_name">AC Monitor</div>
          <i className="bx bx-menu" onClick={btnClick} id="btn" />
        </div>
        <ul >
          <li>
            <a href="ControlPanel">
              <i className="bx bx-shield-quarter" />
              <span className="links_name">Control Panel</span>
            </a>
            <span className="tooltip">Control Panel</span>
          </li>
          <li>
            <a href="www.df.com">
              <i className="bx bx-grid-alt" />
              <span className="links_name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li></li>
          <li>
            <a href="www.df.com">
              <i className="bx bx-cog" />
              <span className="links_name">Settings</span>
            </a>
            <span className="tooltip">Settings</span>
          </li>
          <li>
            <a href="/LayoutCreation">
              <i className="bx bx-user" />
              <span className="links_name">Create Profile</span>
            </a>
            <span className="tooltip">Create Profile</span>
          </li>
          
          <li>
            <a href="/TimeScheduler">
              <i className="bx bx-user" />
              <span className="links_name">Schedule Profile</span>
            </a>
            <span className="tooltip">Schedule Profile</span>
          </li>
          <li>
            <a href="www.df.com">
              <i className="bx bxs-save" />
              <span className="links_name">Save Profile</span>
            </a>
            <span className="tooltip">Save Profile</span>
          </li>
          <li>
            <a href="www.df.com">
              <i className="bx bx-trash" />
              <span className="links_name">Delete Profile</span>
            </a>
            <span className="tooltip">Delete Profile</span>
          </li>
          <li>
            <a href="www.df.com">
              <i className="bx bxs-pencil" />
              <span className="links_name">Edit Profile</span>
            </a>
            <span className="tooltip">Edit Profile</span>
          </li>
        </ul>
      </div>
        </div>
    )
}

export default SideBar1
