import React, { useState } from 'react';
import Header from '../Utills/Header';
import Footer from '../Utills/Footer';
import Sidebar from '../Utills/Sidebar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Add() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [DOB, setDOB] = useState("");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("DOB", DOB);
    formData.append("role", role);
    formData.append("address", address);
    formData.append("image", image);

    try {
      const response = await axios.post("http://https://my-backend-api-usbu.onrender.com/api/admin/addUser", formData);
      const msg = response.data.message;

      if (response.data.success) {
        toast.success(msg);
        setTimeout(() => navigate("/users"), 2000);
      } else {
        toast.error(msg);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="layout-wrapper">
      <Toaster position="top-center" reverseOrder={false} />

      <Sidebar />
      <div className="page-content">
        <Header />

        <div className="container py-4" style={{ maxWidth: '1000px' }}>
          <h2 className="mb-4">Add User</h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Column 1 */}
              <div className="col-md-4">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <label className="form-label mt-3">
                  DOB <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={DOB}
                  onChange={(e) => setDOB(e.target.value)}
                  max={new Date(Date.now() - 86400000).toISOString().split("T")[0]}
                  required
                />

                <label className="form-label mt-3">
                  Profile Image <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>

              {/* Column 2 */}
              <div className="col-md-4">
                <label className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />

                <label className="form-label mt-3">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />

                <label className="form-label mt-3">
                  Select Role <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </select>
              </div>

              {/* Column 3 */}
              <div className="col-md-4">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label className="form-label mt-3">
                  Address <span className="text-danger">*</span>
                </label>
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
            <div className="mt-4">
              <Link to="/users">
                <button type="button" className="btn btn-secondary me-2">
                  Cancel
                </button>
              </Link>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
}
