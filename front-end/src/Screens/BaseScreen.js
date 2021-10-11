import TimeScheduler from "./TimeSchedulerScreen";
import LayoutCreation from "./LayoutCreationScreen"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ControlPanel from "../Components/ControlPanel";
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
      <Route path='/TimeScheduler' exact component={TimeScheduler}/>
      <Route path='/LayoutCreation' exact component={LayoutCreation}/>
      <Route path='/ControlPanel' exact component={ControlPanel}/>
      </Switch>
      </Router>
      </Container>
  </>
  );
}

export default BaseScreen;
