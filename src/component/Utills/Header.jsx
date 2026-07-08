import React, { Fragment } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { ToastContainer } from 'react-toastify';
import Logo from '../../assests/images/Ucclogg.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function Header() {
  const navigate = useNavigate()
  const userdata = secureLocalStorage.getItem('user')
  const handlelogout = () => {
    secureLocalStorage.clear()
    navigate('/admin')
    window.location.reload()
  }



  
const [userData,setUserData] = useState({});
// console.log("-----------",userData)
  const viewProfile = async (userId) => {
    try {
      const body = { _id: userId}
      const ApiUrl = 'http://www.https://my-backend-api-usbu.onrender.com/api/admin/my-profile'
      const response = await axios.post(ApiUrl, body)
      if (response.data.success) {
        setUserData(response.data.data)
      } else {
      }
    } catch (err) {
    }
  }

  // call Api
useEffect(()=>{
  const userId = localStorage.getItem("admin-id");
  viewProfile(userId);
},[])
  return (
    <Fragment>
      <div className="navbar-custom">
        <div className="topbar">
          <div className="topbar-menu d-flex align-items-center gap-lg-2 gap-1">
            {/* Brand Logo */}
            <div className="logo-box">
              {/* Brand Logo Light */}
              <a href="/" className="logo-light">
                <img src={Logo} alt="logo" className="logo-lg" height={22} />
                <img src={Logo} alt="small logo" className="logo-sm" height={22} />
              </a>
              {/* Brand Logo Dark */}
              <a href="/" className="logo-dark">
                <img src={Logo} alt="dark logo" className="logo-lg" height={22} />
                <img src={Logo} alt="small logo" className="logo-sm" height={22} />
              </a>
            </div>
            {/* Sidebar Menu Toggle Button */}
            {/* <button className="button-toggle-menu">
            <i className="mdi mdi-menu" />
          </button> */}
          </div>
          <ul className="topbar-menu d-flex align-items-center gap-4">
            <li className="dropdown">
              <a className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <img src={userData.image} alt="user-image" className="rounded-circle" />
                <span className="ms-1 d-none d-md-inline-block">
                  {userdata?.email}<i className="mdi mdi-chevron-down" />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end profile-dropdown ">
                {/* item*/}
                <a className="dropdown-item notify-item ">
                  <Link to={"/myprofile"}><span className='fw-bold text-black' >My Profile</span></Link>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item notify-item ">
                  <Link to={"/changepassword"}><span className='fw-bold text-black' >Change Password</span></Link>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item notify-item" onClick={() => handlelogout()} >
                  <i className="fe-log-out" />
                  <span className='fw-bold text-black'>Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Fragment>
  );
}

export default Header