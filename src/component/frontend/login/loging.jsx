import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';  
import Header from '../../frontend copy/mainpage/Header';
import Footer from '../../frontend copy/mainpage/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const ApiUrl = 'http://https://my-backend-api-usbu.onrender.com/api/user/login'; 
      const response = await axios.post(ApiUrl, body);
      const msg = response.data.message;

      if (response.data.success) {
        toast.success(msg);
        localStorage.setItem('user-token', response.data.token);
        localStorage.setItem('user-id', response.data.data._id);
        navigate('/');
      } else {
        toast.error(msg); 
      }
    } catch (err) {
      toast.error(err.message); 
    }
  };

  return (
    <>
    <Header></Header>
    <section className="container mt-5 mb-5">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">  {/* Adjusted width here */}
          <div className="card p-5 shadow-lg">
            <h2 className="text-center mb-4">Welcome</h2>
            <p className="text-center text-muted mb-4">Please login to your account</p>
            <form onSubmit={handleLogin}>
              <div className="row g-3">
                {/* Column 1 */}
                <div className="col-md-12">
                  <label className="form-label">Email Address <span className="text-danger">*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Column 2 */}
                <div className="col-md-12">
                  <label className="form-label mt-3">Password <span className="text-danger">*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 text-center">
                <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                  Login
                </button>
                <div className="text-center">
                  <span className="text-muted">Don't have an account?</span>
                  <br />
                  <Link to="/user-register" className="btn btn-outline-secondary btn-lg mt-2 w-100">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
    </>
    
  );
}

export default Login;
