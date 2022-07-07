import React from "react";

const Navbar = props => {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <div className="container-fluid">
          <a className="navbar-brand" href="#">My SymReact</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02"
                  aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                      <a className="nav-link" href="#">Customers</a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#">Invoices</a>
                  </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <a href="#" className="nav-link">
                          Register ^_^"
                      </a>
                  </li>
                  <li className="nav_item">
                      <a href="#" className="btn btn-success">
                          LogIn ;)
                      </a>
                  </li>
                  <li className="nav_item">
                      <a href="#" className="btn btn-danger">
                          LogOut ;)
                      </a>
                  </li>
              </ul>
          </div>
      </div>
    </nav>
    );
}
    export default Navbar;