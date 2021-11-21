import ScheduleProfiles from "./ScheduleProfiles";
import LayoutCreation from "./LayoutCreationScreen"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ControlPanel from "../Components/ControlPanel/ControlPanel";
import CreateMachine from "./CreateMachine";
import Dashboard from "./Dashboard";
import NavSideBar from '../Components/BaseScreen/NavSideBar'
import '../css/Screens.css'
import { useState,useEffect } from 'react';


function BaseScreen() {
  const { innerWidth: width, innerHeight: height } = window;
  const [heightScreen, setHeightScreen] = useState(0);
  
  useEffect(() => {
    setHeightScreen(height-87)
  }, []);
  return (
    <div>
    <NavSideBar></NavSideBar>
    <section >
        <div style={{backgroundColor:'#e3f2fd',minHeight:heightScreen}}>
        <div id='section'  style={{margin:'0% 1% 0 10%' }}>
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
      </section>
  </div>
  );
}

export default BaseScreen;
