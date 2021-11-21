import ScheduleProfiles from "./ScheduleProfiles";
import LayoutCreation from "./LayoutCreationScreen"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ControlPanel from "../Components/ControlPanel/ControlPanel";
import CreateMachine from "./CreateMachine";
import Dashboard from "./Dashboard";
import '../css/BaseScreen.css'
import { useState,useEffect } from 'react';


function BaseScreen() {
  const { innerWidth: width, innerHeight: height } = window;
  const [heightScreen, setHeightScreen] = useState(0);
  const [navBarToggleState, setNavBarToggleState] = useState(false);
  const [drop,setDrop] = useState(false)

function btnClick(){
  setDrop(false)
  document.getElementsByClassName("sidebar")[0].classList.toggle("open");
};

function dropdown(){
  setDrop(!drop)
}


function navBarLinksContainer(e){
    console.log('prevented')
    e.preventDefault()
    e.stopPropagation()
}




    
 
    
   
    function openMobileNavbar(e,navbar,navbarToggle) {
        console.log(e)
        navbar.classList.add("opened");
        navbarToggle.setAttribute("aria-expanded", "true");
      }
      
      function closeMobileNavbar(e,navbar,navbarToggle) {
        console.log(e)
        navbar.classList.remove("opened");
        navbarToggle.setAttribute("aria-expanded", "false");
      }
    function navBarToggle(e){
        const navbar = document.getElementById("navbar");
        const navbarToggle = navbar.querySelector(".navbar-toggle");

        if(navBarToggleState){
            console.log('in close')
            setNavBarToggleState(!navBarToggleState)

            closeMobileNavbar(e,navbar,navbarToggle);

        }else{
            console.log('in open')
            setNavBarToggleState(!navBarToggleState)


            openMobileNavbar(e,navbar,navbarToggle);


        }

    }
 
  useEffect(() => {
    setHeightScreen(height)
  }, []);
  return (
    <div>
<header id="navbar">
        <nav className="navbar-container container">
          <a href="/" className="home-link">
            <div className="navbar-brand"></div>
            AC Monitor
          </a>
          <button type="button" onClick={(e)=>navBarToggle(e)} className="navbar-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="navbar-menu">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
          </button>
          <div  id="navbar-menu" className="detached">
            <ul className="navbar-links">
           


              <li className="navbar-item"><a className="navbar-link" href="/ControlPanel">Control Panel</a></li>

              <li className="navbar-item"><a className="navbar-link" href="/">Dashboard</a></li>
             
              <li className="navbar-item" onClick={(e)=>navBarLinksContainer(e)} >
         <a onClick={dropdown} className="navbar-link" href="/" >Settings {drop?"▲":"▼"}
         </a>
       </li>
       {drop}
       {drop && <>
         <li className="navbar-item">
         <a className="navbar-link"  href="/Schedules">&nbsp;&nbsp;&nbsp;ScheduleProfiles
         </a>
       </li>
       <li className="navbar-item">
         <a className="navbar-link"  href="/LayoutCreation">&nbsp;&nbsp;&nbsp;Create Profile
         </a>
       </li>
      
       <li className="navbar-item">
         <a className="navbar-link"  href="/CreateMachine">&nbsp;&nbsp;&nbsp;CreateMachine
         </a>
       </li>
       </>}

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
    
    <div style={{backgroundColor:'#e3f2fd',minHeight:heightScreen}}>
        <div id='section' >
        <Router>
        <Switch>
        <Route path='/Schedules' exact component={ScheduleProfiles}/>
        <Route path='/LayoutCreation' exact component={LayoutCreation}/>
        <Route path='/ControlPanel' exact component={ControlPanel}/>
        <Route path='/CreateMachine' exact component={CreateMachine}/>
        <Route path='/' exact component={Dashboard}/>
        </Switch>
        </Router>
        </div>
        </div>
    
      
  </div>
  );
}

export default BaseScreen;
