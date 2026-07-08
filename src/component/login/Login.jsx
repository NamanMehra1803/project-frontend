import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../../assests/images/Ucclogg.png'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Login 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = { email: email, password: password}
      const ApiUrl = 'http://www.localhost:8080/api/admin/login'
      const response = await axios.post(ApiUrl, body)
        const msg = response.data.message;
      if(response.data.success){
        toast.success(msg)
       localStorage.setItem("admin-token",response.data.token)
       localStorage.setItem("admin-id",response.data.data._id)
        navigate('/dashboard')
      }else{
       toast.error(msg)
      }
    } catch (err) {
         toast.error(err.message)
    }
  }

  return (
    <Fragment>
      <div className='befar'>
        <Toaster  
         position="bottom-center"
          reverseOrder={false} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-md-5">
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center w-75 mx-auto auth-logo mb-4">
                    <a className="logo-dark">
                      <span><img src={Logo} alt height={22} /></span>
                    </a>
                    <a className="logo-light">
                      <span><img src={Logo} alt height={22} /></span>
                    </a>
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                      <label className="form-label" htmlFor="emailaddress">Email address</label>
                      <input className="form-control" type="email" name='email' id="emailaddress" required placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <a href="pages-recoverpw.html" className="text-muted float-end"><small /></a>
                      <label className="form-label" htmlFor="password">Password</label>
                      <input className="form-control" type="password" name='password' required id="password" placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <div className>
                        <input className="form-check-input" type="checkbox" id="checkbox-signin" defaultChecked />
                        <label className="form-check-label ms-2" htmlFor="checkbox-signin">Remember me</label>
                      </div>
                    </div>
                    <div className="form-group mb-0 text-center">
                      <button className="btn btn-primary w-100" type="submit"> Log In </button>
                    </div>
                  </form>
                </div> {/* end card-body */}
              </div>
              {/* end card */}
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="text-white-50"> <a href="pages-register.html" className="text-white-50 ms-1">Forgot your password?</a></p>
                  <p className="text-white-50">Don't have an account? <a href="pages-register.html" className="text-white font-weight-medium ms-1">Sign Up</a></p>
                </div> {/* end col */}
              </div>
              {/* end row */}
            </div> {/* end col */}
          </div>
          {/* end row */}
        </div>
      </div>
    </Fragment>
  )
}

export default Login