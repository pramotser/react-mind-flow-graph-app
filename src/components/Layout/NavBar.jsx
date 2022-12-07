import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/icons/Kaitnakin-Phatra-Bank-Logo.png'
function Navbars() {
  return (
    <>
      <Navbar bg="light" variant="light" style={{ maxHeight: 50 }} >
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