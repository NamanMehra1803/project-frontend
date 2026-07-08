import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from '../Utills/Sidebar';
import Header from '../Utills/Header';
import Footer from '../Utills/Footer';
import axios from '../../Confing/axios';

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);


  const [showUsersTable, setShowUsersTable] = useState(false);
  const [showProductsTable, setShowProductsTable] = useState(false);
  const [showCategoryTable, setShowCategoryTable] = useState(false);


  const toggleUsersTable = () => {
    setShowUsersTable(!showUsersTable);
    setShowProductsTable(false); // optional: close products if users open
    setShowCategoryTable(false); // optional: close users if products open

  };

  const toggleProductsTable = () => {
    setShowProductsTable(!showProductsTable);
    setShowUsersTable(false);     // optional: close users if products open
    setShowCategoryTable(false); // optional: close users if products open
  };


  const toggleCategoryTable = () => {
    setShowCategoryTable(!showCategoryTable);
    setShowUsersTable(false); // optional: close users if products open
    setShowProductsTable(false); // optional: close users if products open

  };


  const dashboardview = async () => {
    try {
      const response = await axios.post('https://my-backend-api-usbu.onrender.com/userViewdashboard');

      console.log("qqqqqq", response.data.data)
      setUserData(response.data.data || []);
    } catch (err) {
      console.error(err.message);
    }
  };

  const ProductView = async () => {
    try {
      const response = await axios.post('https://my-backend-api-usbu.onrender.com/productViewdashboard');
      setProductData(response.data.data || []);
    } catch (err) {
      console.error(err.message);
    }
  };

  const CategoryView = async () => {
    try {
      const response = await axios.post('https://my-backend-api-usbu.onrender.com/categoryViewdashboard');
      setCategoryData(response.data.data || []);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    dashboardview();
    ProductView();
    CategoryView();

  }, []);

  return (
    <Fragment>
      <div className="layout-wrapper">
        <Sidebar />
        <div className="page-content">
          <Header />
          <div className="container-fluid">
            <div className="py-3 py-lg-4">
              <div className="row">
                <div className="col-lg-6">
                  <h4 className="page-title mb-0">Dashboard</h4>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="row">
              <div className="col-md-6 col-xl-3">
                <div
                  className="card shadow-sm"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleUsersTable}
                >
                  <div className="card-body">
                    <h5 className="card-title text-dark" >
                      <span className="menu-icon"><i className="fas fa-user text-dark" style={{ marginLeft: "2px" }} /></span>
                      Total Users = {userData.length}</h5>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-3">
                <div
                  className="card shadow-sm"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleProductsTable}
                >
                  <div className="card-body">
                    <h5 className="card-title text-dark">
                      <span className="menu-icon"><i className="fas fa-box-open" style={{ marginLeft: "2px" }} /></span>
                      Total Products   {productData.length}</h5>
                  </div>
                </div>
              </div>


              <div className="col-md-6 col-xl-3">
                <div
                  className="card shadow-sm"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleCategoryTable}
                >
                  <div className="card-body">
                    <h5 className="card-title text-dark">
                      <span className="menu-icon"><i className="fas fa-tags text-dark" style={{ marginLeft: "2px" }} /></span>
                      Total Categories   {categoryData.length}</h5>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-3">
                <div
                  className="card shadow-sm"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleCategoryTable}
                >
                  <div className="card-body">
                    <h5 className="card-title text-dark">
                      <span className="menu-icon"><i className="fas fa-tags text-dark" style={{ marginLeft: "2px" }} /></span>
                      Total Categories   {categoryData.length}</h5>
                  </div>
                </div>
              </div>

            </div>

            {/* Users Table */}
            {showUsersTable && (
              <div className="row mt-4">
                <h4 className="page-title mb-2">Users</h4>
                <div className="col-12 table-responsive">
                  <table className="table table-bordered border-dark table-hover text-center align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.length === 0 ? (
                        <tr>
                          <td colSpan="5">No users found.</td>
                        </tr>
                      ) : (
                        userData.map((user, index) => (
                          <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={`https://my-backend-api-usbu.onrender.com/uploads/${user.image}`}
                                alt={user.name || "No image"}
                                style={{
                                  height: '40px',
                                  width: '40px',
                                  borderRadius: '20%',
                                  objectFit: 'cover'
                                }}
                              />
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString("en-US", {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Products Table */}
            {showProductsTable && (
              <div className="row mt-4">
                <h4 className="page-title mb-2">Products</h4>
                <div className="col-12 table-responsive">
                  <table className="table table-bordered border-dark table-hover text-center align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productData.length === 0 ? (
                        <tr>
                          <td colSpan="5">No products found.</td>
                        </tr>
                      ) : (
                        productData.map((product, index) => (
                          <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={`https://my-backend-api-usbu.onrender.com/uploads/${product.image}`}
                                alt={product.name || "No image"}
                                style={{
                                  height: '40px',
                                  width: '40px',
                                  borderRadius: '20%',
                                  objectFit: 'cover'
                                }}
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.cat_id?.name || "N/A"}</td>
                            <td>{new Date(product.createdAt).toLocaleDateString("en-US", {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {showCategoryTable && (
              <div className="row mt-4">
                <h4 className="page-title mb-2">Category</h4>
                <div className="col-12 table-responsive">
                  <table className="table table-bordered border-dark table-hover text-center align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData.length === 0 ? (
                        <tr>
                          <td colSpan="7">No category found.</td>
                        </tr>
                      ) : (
                        categoryData.map((category, index) => (
                          <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={`https://my-backend-api-usbu.onrender.com/uploads/${category.image}`}
                                alt={category.name || "No image"}
                                style={{
                                  height: '40px',
                                  width: '40px',
                                  borderRadius: '20%',
                                  objectFit: 'cover'
                                }}
                              />
                            </td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>{new Date(category.createdAt).toLocaleDateString("en-US", {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
