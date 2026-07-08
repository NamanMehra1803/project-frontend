import React, { useState } from 'react';
import Header from '../Utills/Header';
import Footer from '../Utills/Footer';
import Sidebar from '../Utills/Sidebar';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Add() {
  const navigate = useNavigate();
  const { state: lineData } = useLocation();
  const userId = lineData._id;

  const event = lineData.DOB ? new Date(lineData.DOB) : new Date("2017-10-19T16:00:00.000");
  const [firstName, setFirstName] = useState(lineData.firstName),
        [lastName, setLastName] = useState(lineData.lastName),
        [email, setEmail] = useState(lineData.email),
        [mobile, setMobile] = useState(lineData.mobile),
        [DOB, setDOB] = useState(event.toISOString().split('T')[0]),
        [image, setImage] = useState(lineData.image),
        [role, setRole] = useState(lineData.role),
        [address, setAddress] = useState(lineData.address);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    [["_id", userId], ["firstName", firstName], ["lastName", lastName], ["email", email], ["mobile", mobile], ["DOB", DOB], ["role", role], ["address", address], ["image", image]].forEach(([k, v]) => formData.append(k, v));
    try {
      const { data } = await axios.post("http://localhost:8080/api/user/update", formData);
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => navigate("/users"), 2000);
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const maxDOB = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0]; })();

  return (
    <div className="layout-wrapper">
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar />
      <div className="page-content">
        <Header />
        <div className="container" style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
          <h2>USER EDIT</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label>First Name <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <label>DOB <span style={{ color: "red" }}>*</span></label>
                <input type="date" value={DOB} onChange={e => setDOB(e.target.value)} max={maxDOB} />
                <label>Profile Image <span style={{ color: "red" }}>*</span></label>
                <input type="file" name="profileImage" accept="image/*" onChange={e => setImage(e.target.files[0])} />
              </div>

              <div style={{ flex: 1 }}>
                <label>Last Name <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                <label>Phone Number <span style={{ color: "red" }}>*</span></label>
                <input type="number" name="mobile" value={mobile} onChange={e => setMobile(e.target.value)} />
                <label>Role <span style={{ color: "red" }}>*</span></label>
                <select name="role" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="1">admin</option>
                  <option value="2">user</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label>Email <span style={{ color: "red" }}>*</span></label>
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Address <span style={{ color: "red" }}>*</span></label>
                <textarea name="address" value={address} onChange={e => setAddress(e.target.value)} />
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <Link to="/users"><button type="reset">Cancel</button></Link>
              <button className="btn btn-success" type="submit" style={{ marginLeft: '10px', marginBottom: "5px" }}>Submit</button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}
