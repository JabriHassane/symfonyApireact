import React from "react";
import authApi from "../services/authApi";
import {NavLink} from "react-router-dom";

const Navbar = ({isAuthenticated, onLogout}) => {
    const handleLogout = ()=> {
        authApi.logout();
        onLogout(false);
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">My SymReact</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02"
                  aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                      <NavLink className="nav-link" to="/customers">Customers</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink className="nav-link" to="/invoices">Invoices</NavLink>
                  </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                  {(!isAuthenticated &&
                      (<>
                          <li className="nav-item">
                              <NavLink to="/register" className="nav-link">
                                  Register ^_^"
                              </NavLink>
                          </li> &nbsp;&nbsp;
                          <li className="nav_item">
                              <NavLink to="/login" className="btn btn-success">
                              LogIn ;)
                              </NavLink>
                          </li>
                      </>)) ||

                  (<>
                      &nbsp;&nbsp;
                      <li className="nav_item">
                          <button onClick={handleLogout} className="btn btn-danger">
                              LogOut ;)
                          </button>
                      </li>
                  </>)
                  }
              </ul>
          </div>
      </div>
    </nav>
    );
}
    export default Navbar;