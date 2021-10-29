import ScheduleProfiles from "./ScheduleProfiles";
import LayoutCreation from "./LayoutCreationScreen"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ControlPanel from "../Components/ControlPanel";
import CreateMachine from "./CreateMachine";
import Dashboard from "./Dashboard";
import SideBar from "../Components/SideBar";
import { Container } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import '../css/Screens.css'

function BaseScreen() {
  return (
    <div>
    <SideBar></SideBar>
    <NavBar></NavBar>
     
     <div style={{backgroundColor:'#e3f2fd'}}>
    <div  style={{padding:'0% 1% 0 6%' }}>
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
