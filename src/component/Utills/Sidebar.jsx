import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assests/images/Ucclogg.png'

function Sidebar() {
  return (
    <Fragment>

      <div className="main-menu">
        {/* Brand Logo */}
        <div className="logo-box">
          {/* Brand Logo Light */}
          <a className="logo-light">
            <img src={Logo} alt="logo" className="logo-lg" height={28} />
            <img src={Logo} alt="small logo" className="logo-sm" height={28} />
          </a>
          {/* Brand Logo Dark */}
          <a className="logo-dark">
            <img src={Logo} alt="dark logo" className="logo-lg" height={28} />
            <img src={Logo} alt="small logo" className="logo-sm" height={28} />
          </a>
        </div>
        {/*- Menu */}
        <div data-simplebar>
          <ul className="app-menu">
            <li className="menu-title">Menu</li>
            <li className="menu-item">
              <Link to={'/dashboard'} className="menu-link waves-effect waves-light">
                <span className="menu-icon"><i className="bx bx-home-smile" /></span>
                <span className="menu-text"> Dashboard </span>

              </Link>
            </li>
            <li className="menu-item">
              <Link to={"/users"} className="menu-link waves-effect waves-light">
                <span className="menu-icon"><i className="fas fa-user" /></span>
                <span className="menu-text"> User Manager </span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={"/category"} className="menu-link waves-effect waves-light">
                <span className="menu-icon"><i className="bx bx-category" /></span>
                <span className="menu-text"> Category Manager </span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={"/product"} className="menu-link waves-effect waves-light">
                <span className="menu-icon"><i className="fas fa-box-open" /></span>
                <span className="menu-text"> Product Manager </span>
              </Link>
              <li className="menu-item">
                <Link to={"/contactUs"} className="menu-link waves-effect waves-light">
                  <span className="menu-icon"><i className="fa fa-address-book" /></span>
                  <span className="menu-text"> Contact Manager </span>
                </Link>
              </li>
              <li className="menu-item">
                <Link to={"/Orders"} className="menu-link waves-effect waves-light">
                  <span className="menu-icon"><i className="fa fa-shopping-cart" /></span>
                  <span className="menu-text"> Order Manager </span>
                </Link>
              </li>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default Sidebar