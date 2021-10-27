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
    <>
    <SideBar></SideBar>
    <NavBar></NavBar>
     
    <Container className="Container">
    <Router>
    <Switch>
      <Route path='/Schedules' exact component={ScheduleProfiles}/>
      <Route path='/LayoutCreation' exact component={LayoutCreation}/>
      <Route path='/ControlPanel' exact component={ControlPanel}/>
      <Route path='/CreateMachine' exact component={CreateMachine}/>
      <Route path='/Dashboard' exact component={Dashboard}/>
      </Switch>
      </Router>
      </Container>
  </>
  );
}

export default BaseScreen;
