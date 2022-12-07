import { Navbar, Nav } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../../assets/icons/Kaitnakin-Phatra-Bank-Logo.png'
function Navbars() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              alt=""
              src={Logo}
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/decisionFlow">
              <Nav.Link>Decision flow</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Navbars;