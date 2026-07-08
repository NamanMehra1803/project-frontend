import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      {/* Header Section Begin */}
      <header className="header">
        <div className="container-fluid">
          <div className="row align-items-center" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            
            {/* Logo Section */}
            <div className="col-xl-3 col-lg-2 col-6">
              <div className="header__logo">
                <a href="./index.html">
                  <img src="img/logo.png" alt="Logo" />
                </a>
              </div>
            </div>

            {/* Laptop Menu (Mobile me automatic hide) */}
            <div className="col-xl-6 col-lg-7 d-none d-lg-block">
              <nav className="header__menu">
                <ul>
                  <li className="active"><a href="./index.html">Home</a></li>
                  <li><a href="#">Women’s</a></li>
                  <li><a href="#">Men’s</a></li>
                  <li><a href="./shop.html">Shop</a></li>
                  <li>
                    <a href="#">Pages</a>
                    <ul className="dropdown">
                      <li><a href="./product-details.html">Product Details</a></li>
                      <li><a href="./shop-cart.html">Shop Cart</a></li>
                      <li><a href="./checkout.html">Checkout</a></li>
                      <li><a href="./blog-details.html">Blog Details</a></li>
                    </ul>
                  </li>
                  <li><a href="./blog.html">Blog</a></li>
                  <li><a href="./contact.html">Contact</a></li>
                </ul>
              </nav>
            </div>

            {/* Right Side Section - Isko humne zabardasti mobile me visible kiya hai */}
            <div className="col-xl-3 col-lg-3 col-6" style={{ display: 'block !important' }}>
              <div className="header__right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', visibility: 'visible', opacity: 1 }}>
                
                {/* 🔓 LOGIN/REGISTER BUTTONS - Inhe inline style se force kiya hai phone me dikhne ke liye */}
                <div style={{ display: 'flex', gap: '10px', marginRight: '15px', fontSize: '14px', fontWeight: '600' }}>
                  <Link to="/user-loging" style={{ color: '#111', textDecoration: 'none' }}>Login</Link>
                  <span style={{ color: '#ccc' }}>|</span>
                  <Link to="/user-register" style={{ color: '#111', textDecoration: 'none' }}>Register</Link>
                </div>

                {/* Baaki icons jo laptop me dikhte the */}
                <ul className="header__right__widget d-none d-md-flex" style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex' }}>
                  <li style={{ marginLeft: '10px' }}><span className="icon_search search-switch" /></li>
                  <li style={{ marginLeft: '10px' }}>
                    <a href="#" style={{ position: 'relative' }}>
                      <span className="icon_heart_alt" />
                      <div className="tip">2</div>
                    </a>
                  </li>
                </ul>

              </div>
            </div>

          </div>

          {/* 3 Lines wala Hamburger Menu (Jo phone me dikh raha hai) */}
          <div className="canvas__open">
            <i className="fa fa-bars" />
          </div>

        </div>
      </header>
      {/* Header Section End */}
    </div>
  );
}