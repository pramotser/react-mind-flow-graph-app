import "./sidebar.scss";
import { Link } from "react-router-dom";
import * as AiIcons from 'react-icons/ai'

import Logo from '../../../assets/images/KKP-group-logo_white.png'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            alt=""
            src={Logo}
            height="30"
            className="d-inline-block align-top"
          />
        </Link>
      </div>
      <hr style={{ marginTop: '0px' }} />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <AiIcons.AiOutlineHome className="icon" />
              <span>Home</span>
            </li>
          </Link>
          <p className="title">Flow</p>

          <Link to="/flow-management" style={{ textDecoration: "none" }}>
            <li>
              <AiIcons.AiOutlineBars className="icon" />
              <span>Flow Management</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
