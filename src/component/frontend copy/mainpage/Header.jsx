import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user-token");

    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("user-token");
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  function isTokenValid(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }

  return (
    <>
      <style>{`
        .header{
          background:#fff;
          box-shadow:0 2px 10px rgba(0,0,0,.08);
          position:sticky;
          top:0;
          z-index:999;
        }

        .navbar{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:12px 20px;
        }

        .logo img{
          height:55px;
        }

        .menu{
          display:flex;
          align-items:center;
          gap:25px;
        }

        .menu a{
          text-decoration:none;
          color:#222;
          font-weight:500;
          transition:.3s;
        }

        .menu a:hover{
          color:#0d6efd;
        }

        .right{
          display:flex;
          align-items:center;
          gap:15px;
        }

        .btn-login{
          background:#0d6efd;
          color:#fff;
          padding:8px 16px;
          border-radius:6px;
          text-decoration:none;
        }

        .btn-login:hover{
          background:#0b5ed7;
          color:#fff;
        }

        .dropdown{
          position:relative;
        }

        .dropbtn{
          background:none;
          border:none;
          cursor:pointer;
          font-size:16px;
          font-weight:500;
        }

        .dropdown-content{
          display:none;
          position:absolute;
          right:0;
          top:40px;
          min-width:200px;
          background:#fff;
          box-shadow:0 5px 15px rgba(0,0,0,.15);
          border-radius:8px;
          overflow:hidden;
        }

        .dropdown:hover .dropdown-content{
          display:block;
        }

        .dropdown-content a,
        .dropdown-content button{
          width:100%;
          display:block;
          padding:12px 15px;
          border:none;
          background:none;
          text-align:left;
          text-decoration:none;
          color:#333;
          cursor:pointer;
        }

        .dropdown-content a:hover,
        .dropdown-content button:hover{
          background:#f5f5f5;
        }

        .menu-toggle{
          display:none;
          font-size:28px;
          cursor:pointer;
          border:none;
          background:none;
        }

        #mobile-menu{
          display:none;
        }

        @media(max-width:768px){

          .menu-toggle{
            display:block;
          }

          .menu{
            display:none;
            flex-direction:column;
            position:absolute;
            left:0;
            top:80px;
            width:100%;
            background:#fff;
            padding:20px;
            box-shadow:0 4px 12px rgba(0,0,0,.15);
            gap:15px;
          }

          #mobile-menu:checked ~ .menu{
            display:flex;
          }

          .right{
            margin-top:15px;
            width:100%;
            justify-content:center;
          }

          .dropdown-content{
            position:static;
            display:block;
            box-shadow:none;
            margin-top:10px;
          }

          .dropdown:hover .dropdown-content{
            display:block;
          }
        }
      `}</style>

      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <img src="img/logo.png" alt="Logo" />
            </Link>
          </div>

          <input type="checkbox" id="mobile-menu" />

          <label htmlFor="mobile-menu" className="menu-toggle">
            ☰
          </label>

          <div className="menu">
            <Link to="/">Home</Link>
            <Link to="/front-category">Category</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact-us">Contact Us</Link>

            <div className="right">
              {!isLoggedIn ? (
                <Link className="btn-login" to="/user-loging">
                  Login
                </Link>
              ) : (
                <div className="dropdown">
                  <button className="dropbtn">👤 Account ▾</button>

                  <div className="dropdown-content">
                    <Link to="/user-profile">My Profile</Link>
                    <Link to="/Order-detail">Order History</Link>
                    <Link to="/Wishlist-detail">Wishlist</Link>
                    <Link to="/AddToCartSection-detail">Cart</Link>
                    <Link to="/admin">Admin Login</Link>

                    <button onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
