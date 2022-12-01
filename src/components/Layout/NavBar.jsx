import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/logo_login_page.png'

function Navbars() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' '}
            Decision Config
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;