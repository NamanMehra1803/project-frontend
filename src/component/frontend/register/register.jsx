import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; 
import Header from '../../frontend copy/mainpage/Header';
import Footer from '../../frontend copy/mainpage/Footer';

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [DOB, setDOB] = useState('');
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('DOB', DOB);
    formData.append('address', address);
    formData.append('image', image);
    formData.append('password', password);

    try {
      const response = await axios.post('http://https://my-backend-api-usbu.onrender.com/api/admin/register', formData);
      const msg = response.data.message;

      if (response.data.success) {
        toast.success(msg);
        setTimeout(() => navigate('/user-loging'), 2000); 
      } else {
        toast.error(msg);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
    }
  };

  return (
     <>
    <Header></Header>
    <section className="container mt-5 mb-5">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">  
          <div className="card p-5 shadow-lg">
            <h2 className="text-center mb-4">Create an Account</h2>
            <p className="text-center text-muted mb-4">Please register your account</p>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Column 1 */}
                <div className="col-md-6">
                  <label className="form-label">First Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />

                  <label className="form-label mt-3">DOB <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    className="form-control"
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                    max={new Date(Date.now() - 86400000).toISOString().split('T')[0]}
                    required
                  />

                  <label className="form-label mt-3">Profile Image <span className="text-danger">*</span></label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>

                {/* Column 2 */}
                <div className="col-md-6">
                  <label className="form-label">Last Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />

                  <label className="form-label mt-3">Phone Number <span className="text-danger">*</span></label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>

                {/* Column 3 */}
                <div className="col-md-12">
                  <label className="form-label">Email <span className="text-danger">*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <label className="form-label mt-3">Password <span className="text-danger">*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <label className="form-label mt-3">Address <span className="text-danger">*</span></label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="5"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 text-center">
                <Link to="/user-loging">
                  <button type="button" className="btn btn-secondary me-2">
                    Back to Login
                  </button>
                </Link>
                <button type="submit" className="btn btn-success">
                  Register
                </button>
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
