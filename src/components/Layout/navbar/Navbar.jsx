import { Navbar, Nav } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../../../assets/images/KKP-group-logo_white.png'

import React, { useState } from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";

import { IconContext } from "react-icons";

// ROUTING

import { Link } from "react-router-dom";

// DATA FILE
import { SidebarData } from "./SidebarData";

function Navbars() {

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <Navbar className='navbar-custom' variant="dark" expand="lg" style={{ maxHeight: 50, backgroundColor: '#594f74' }}>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              alt=""
              src={Logo}
              height="30"
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