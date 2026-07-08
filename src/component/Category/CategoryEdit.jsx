import React, { useState } from 'react';
import Header from '../Utills/Header'
import Footer from '../Utills/Footer'
import Sidebar from '../Utills/Sidebar'
import "../User/Add.css"
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';




export default function CategoryEdit() {


  const navigate = useNavigate();
  const location = useLocation();
  const lineData = location.state
  const userId = lineData._id

  const [name, setName] = useState(lineData.name);
  const [description, setDescription] = useState(lineData.description);
  const [image, setImage] = useState(lineData.image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("_id", userId);
    formData.append("description", description);
    try {
      const response = await axios.post("http://https://my-backend-api-usbu.onrender.com/update-category", formData);
      const msg = response.data.message;

      if (response.data.success) {
        toast.success(msg);
        setTimeout(() => {
          navigate("/category");
        }, 2000);

      }
      else {
        toast.error(msg);
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };


  return (
    <>

      <div className="layout-wrapper">
        <Toaster position="top-center" reverseOrder={false} />

        <Sidebar />
        <div className="page-content">
          <Header />
          <div className="container  mt-4 p-5 bg-white rounded shadow-sm" style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
            <h2>Edit Category</h2>
            <form onSubmit={handleSubmit} >
              <div className="row">
                <label>Name <span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Description <span style={{ color: "red" }}>*</span></label>
                <textarea type="text" name="address" value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <label >Category Image <span style={{ color: "red" }}>*</span></label>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div style={{ marginTop: '20px' }}>
                <Link to="/category">
                  <button type="reset">Cancel</button>
                </Link>
                <button className="btn btn-success" type="submit" style={{ marginLeft: '10px', marginBottom: "5px" }}>
                  Submit
                </button>
              </div>
            </ form>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}
