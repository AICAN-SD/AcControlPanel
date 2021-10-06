import {Navbar,Container,NavDropdown,Nav,Offcanvas,Form,FormControl,Button} from 'react-bootstrap'
import { useEffect } from 'react';
function NavBar({obj}){
   
    function onClick(){
       
        obj.setShow(true);
        console.log(obj.show)
    }
  return(  <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    <Button variant="secondary" onClick={onClick}>
          Side Bar
        </Button>
  </Container>
</Navbar>
  )
}
export default NavBar;