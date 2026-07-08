import React from 'react'
import Header from '../mainpage/Header'
import Instagram from '../home/Instagram'
import Footer from '../mainpage/Footer'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function CategoryDetails() {
     const queryParameters = new URLSearchParams(window.location.search);
      const cat_id = queryParameters.get("cat_id");
const [Categories, setCategories] = useState([]);
  useEffect(() => {
    const body = {
        cat_id:cat_id
    }
    axios.post('https://my-backend-api-usbu.onrender.com/view-productCat_id-/frontend',body)
      .then(res => {
        if (res.data.success) {
          setCategories(res.data.data || []);
        } else {
          setCategories([]);
        }
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setCategories([]);
      });
  }, []);

    return (
        <>
            <Header />
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to={"/"}>
                               
                                    <i className="fa fa-home" /> Home
                               
                                </Link>
                                <span>Product</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="shop spad">
                <div className="col-lg-12 col-md-12">
                     <div className="row property__gallery">
                                {Categories.map((value) => (
                                  <div key={value._id} className="col-lg-3 col-md-4 col-sm-6 mix women">
                                    {/* ✅ Link with _id passed as query param */}
                                    <Link to={`/product-detail?_id=${value._id}`}>
                                      <div className="product__item">
                                        <div
                                          className="product__item__pic set-bg"
                                          style={{
                                            backgroundImage: `url('https://my-backend-api-usbu.onrender.com/uploads/${value.image}')`
                                          }}
                                        >
                                          <div className="label new">New</div>
                                          <ul className="product__hover">
                                            <li>
                                              <a href={`https://my-backend-api-usbu.onrender.com/uploads/${value.image}`} className="image-popup">
                                                <span className="arrow_expand" />
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#"><span className="icon_heart_alt" /></a>
                                            </li>
                                            <li>
                                              <a href="#"><span className="icon_bag_alt" /></a>
                                            </li>
                                          </ul>
                                        </div>
                    
                                        <div className="product__item__text">
                                          <h6>{value.name}</h6>
                                          <div className="rating">
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                          </div>
                                          <div className="product__price">₹{value.price}</div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                </div>
            </section>
            <Instagram />
            <Footer />
        </>
    )
}