import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import TimeScheduler from "./TimeSchedulerScreen";
import LayoutCreation from "./LayoutCreationScreen"

import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function BaseScreen() {
    const [show, setShow] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <NavBar obj={{show:show,setShow:setShow}}></NavBar>
    <SideBar obj={{show:show,setShow:setShow}}></SideBar>
    <Router>
    <Switch>
      <Route path='/TimeScheduler' exact component={TimeScheduler}/>
      <Route path='/LayoutCreation' exact component={LayoutCreation}/>
      </Switch>
      </Router>
  </>
  );
}

export default BaseScreen;
