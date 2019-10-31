import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { NavLink} from 'react-router-dom';
import appLogo from '../../assets/Images/logo2.png';

const FooterPage = () => {
  return (
    <MDBFooter style={{backgroundColor: "#301893"}} className="font-small pt-5 mt-5">
      <MDBContainer className="text-center text-md-left">
        <MDBRow >
          <MDBCol md="7">
            <h5 className="title">About AirQ</h5>
            <p>
            Get the latest air pollution stats for your city in only one click.
            The data is received from sensors set in all regions collected in our database.
            </p>
          </MDBCol>
          <MDBCol md="2">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <NavLink to="/stats">Stats</NavLink>
              </li>
              <li className="list-unstyled">
              <NavLink to="/stats">Process</NavLink>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
          <NavLink to="/">
            <img width={"200px"} src={appLogo} to="/" alt="App Logo"/>    
            </NavLink>
          </MDBCol> 
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: AirQ
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;