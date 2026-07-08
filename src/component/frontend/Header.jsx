import React from 'react';
import { Link } from 'react-router-dom'; // Agar React Router use kar rahe ho toh a tag ki jagah Link use kar sakte ho

export default function Header() {
  return (
    <div>
      {/* Header Section Begin */}
      <header className="header">
        <div className="container-fluid">
          {/* row ko flex-wrap rakhenge taaki mobile me niche wrap ho sake ya adjust ho sake */}
          <div className="row align-items-center">
            
            {/* Logo: Mobile me aadha space lega (col-6) */}
            <div className="col-xl-3 col-lg-2 col-6">
              <div className="header__logo">
                <a href="./index.html">
                  <img src="img/logo.png" alt="Logo" />
                </a>
              </div>
            </div>

            {/* Menu: Laptop me dikhega, mobile me d-none se chhup jayega (kyunki mobile me canvas menu hota hai) */}
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

            {/* Right Side (Login/Widgets): Mobile me bhi dikhega (col-6), text-right taaki right me chipka rahe */}
            <div className="col-xl-3 col-lg-3 col-6 text-right">
              <div className="header__right d-flex align-items-center justify-content-end">
                
                {/* Login/Register: style se thoda gap de diya taaki mobile me tight na ho */}
                <div className="header__right__auth" style={{ marginRight: '15px', display: 'inline-block' }}>
                  <Link to="/user-loging" style={{ marginRight: '10px' }}>Login</Link>
                  <Link to="/user-register">Register</Link>
                </div>

                <ul className="header__right__widget d-flex align-items-center" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  <li style={{ marginLeft: '10px' }}>
                    <span className="icon_search search-switch" />
                  </li>
                  <li style={{ marginLeft: '10px' }}>
                    <a href="#" style={{ position: 'relative' }}>
                      <span className="icon_heart_alt" />
                      <div className="tip" style={{ position: 'absolute', top: '-10px', right: '-10px' }}>2</div>
                    </a>
                  </li>
                  <li style={{ marginLeft: '10px' }}>
                    <a href="#" style={{ position: 'relative' }}>
                      <span className="icon_bag_alt" />
                      <div className="tip" style={{ position: 'absolute', top: '-10px', right: '-10px' }}>2</div>
                    </a>
                  </li>
                </ul>

              </div>
            </div>

          </div>

          {/* Hamburger Menu Icon (Sirf mobile me dikhega) */}
          <div className="canvas__open d-lg-none">
            <i className="fa fa-bars" />
          </div>

        </div>
      </header>
      {/* Header Section End */}
    </div>
  );
}