import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const isLoggedIn = Boolean(localStorage.getItem("user-token"));

  const [isLoggedInn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('user-token');
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('user-token');
    setIsLoggedIn(false);
    window.location.reload();
  };

  function isTokenValid(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return expiry > now;
    } catch (err) {
      return false;
    }
  }


  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-2">
            <div className="header__logo">
              <Link to="/">
                <img src="img/logo.png" alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7">
            <nav className="header__menu">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/front-category">Category</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__right">
              <ul className="header__right__widget">
                {!isLoggedIn ? (
                  <div>
                    <button className="btn btn-sm btn-outline-primary ms-2">
                      <Link to="/user-loging">
                        Log In
                      </Link>
                    </button>
                  </div>
                ) : (
                  <div>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="userMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-circle me-1"></i> Account
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                        <li>
                          <Link className="dropdown-item" to="/user-profile">
                            <i className="bi bi-person me-2"></i> My Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Order-detail">
                            <i className="bi bi-receipt me-2"></i> Order History
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Wishlist-detail">
                            <i className="bi bi-heart me-2"></i> Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/AddToCartSection-detail">
                            <i className="bi bi-bag me-2"></i> Cart
                          </Link>
                        </li>
                        <li>
                          <button onClick={handleLogout} className="dropdown-item">
                            <i className="bi bi-box-arrow-right me-2"></i> Log Out
                          </button>
                        </li>
                      </ul>
                    </li>
                  </div>

                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="canvas__open">
          <i className="fa fa-bars" />
        </div>
      </div>
    </header>
  );
}
