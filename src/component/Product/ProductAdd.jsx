import Header from '../Utills/Header'
import Footer from '../Utills/Footer'
import Sidebar from '../Utills/Sidebar'
import "../User/Add.css"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';



export default function ProductAdd() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cat_id, setCat_id] = useState("");
  console.log("-----------", cat_id)
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    } else {
      toast("Please select an image.");
      return;
    }

    formData.append("description", description);
    formData.append("price", price);
    formData.append("cat_id", cat_id);
    try {
      const response = await axios.post("http://localhost:8080/add-product", formData);
      const msg = response.data.message;

      if (response.data.success) {
        toast.success(msg);
        setTimeout(() => {
          navigate("/product");
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

  // view category
  const categoryView = async () => {
    try {
      const ApiUrl = 'http://localhost:8080/view-categoryes';
      const response = await axios.post(ApiUrl);
      if (response.data.success) {
        setCategory(response.data.data)
      } else (
        console.log("errr")
      )
    } catch (err) {
      // toast.error(err.message) 
    }
  }

  useEffect(() => {
    categoryView();
  }, [])


  return (
    <>

      <div className="layout-wrapper">
        <Toaster position="top-center" reverseOrder={false} />

        <Sidebar />
        <div className="page-content">
          <Header />
          <div className="container  mt-4 p-5 bg-white rounded shadow-sm" style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} >

              <div className="row">

                <label>Name <span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Price <span style={{ color: "red" }}>*</span></label>
                <input type="Number" name="price" value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <label>Description <span style={{ color: "red" }}>*</span></label>
                <textarea type="text" name="Description" value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <label>Select Category <span style={{ color: "red" }}>*</span></label>
                <select
                  name="text"
                  value={cat_id}
                  onChange={(e) => setCat_id(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {category.map(item => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </select>
                <label >Product Image <span style={{ color: "red" }}>*</span></label>
                <input
                  type="file"
                  alt="NoProfile"
                  name="profileImage"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div style={{ marginTop: '20px' }}>
                <Link to="/product">
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
