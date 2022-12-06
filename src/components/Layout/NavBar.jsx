// import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/kkp_logo.png'

function Navbars() {
  return (
    <>
      <Navbar bg="light" variant="light">
        {/* <Container> */}
          <Navbar.Brand>
            <img
              alt=""
              src={Logo}
              // width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' '}
            {/* Decision Config */}
          </Navbar.Brand>
        {/* </Container> */}
      </Navbar>
    </>
  );
}

export default Navbars;