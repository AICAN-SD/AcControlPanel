import React,{useState} from 'react'
import '../../css/NavSideBar.css';

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
      <>
      <header id='header'  style={{width:'100%'}}>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">AC Monitor</a>
  <button  class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
      <a  href="/ControlPanel">
              <i className="bx bx-shield-quarter" />
              <span >Control Panel</span>
            </a>
            <span className="tooltip">Control Panel</span>
        </li>
        <li>
            <a href="/">
              <i className="bx bx-grid-alt" />
              <span >Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
      
      
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="bx bx-cog" /><span className="links_name">Settings</span>
        </a>

        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          
            

            <a  class="dropdown-item" href="/Schedules">
              <i className="far fa-calendar"/>
              <span className="links_name">ScheduleProfiles</span>
            </a>
            <span className="tooltip">Schedule Profiles</span>

            
            <a class="dropdown-item" href="/LayoutCreation">
              <i className="bx bx-user" />
              <span className="links_name">Create Profile</span>
            </a>
            <span className="tooltip">Create Profile</span>
          
         
            <a class="dropdown-item" href="/CreateMachine">
              <i className="bx bxs-save" />
              <span className="links_name">CreateMachine</span>
            </a>
            <span className="tooltip">CreateMachine</span>
            
          
        </div>
      </li>
      
    </ul>
   
  </div>
</nav>
      </header>
        <aside>
         
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
        </aside>
        </>
    )
}

export default SideBar1
