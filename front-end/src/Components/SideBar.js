import {Navbar,Container,Row,Col,Nav,Offcanvas,Form,FormControl,Button} from 'react-bootstrap'
import { useEffect } from 'react';
function SideBar({obj}){
function onClick(){
    obj.setShow(false)
}
    return (
        <>
       
  
        <Offcanvas show={obj.show} onHide={onClick}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              
          <Container fluid>
  <Row>
    <Col>
    <Nav.Link href='/LayoutCreation'>LayoutCreation</Nav.Link>
    </Col>
  </Row>
  <Row>
    <Col>
    <Nav.Link href='/TimeScheduler'>TimeScheduler</Nav.Link>
    </Col>
  </Row>
</Container>
          </Offcanvas.Body>
        </Offcanvas> 
        </>
        )
}
export default SideBar;