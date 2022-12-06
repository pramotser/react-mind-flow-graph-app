// import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/icons/Kaitnakin-Phatra-Bank-Logo.png'
// import Logo from '../../assets/icons/kkp_logo.png'
function Navbars() {
  return (
    <>
      <Navbar bg="light" variant="light" style={{maxHeight: 50}} >
          <Navbar.Brand>
            <img
              alt=""
              src={Logo}
              height="60"
              className="d-inline-block align-top"
            />
            {' '}
          </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default Navbars;