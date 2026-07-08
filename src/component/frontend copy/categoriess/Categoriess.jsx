import React, { useEffect, useState } from 'react'
import Header from '../mainpage/Header'
import Instagram from '../home/Instagram'
import Footer from '../mainpage/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Categoriess(){
    
 const [Categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/viewall-category/frontend')
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
          <Header/>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to={"/"}>
                                    <i className="fa fa-home" /> Home
                                </Link>
                                <span>Categories</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <section className="shop spad">
                    <div className="col-lg-12 col-md-12">
                          <div className="row property__gallery">
                                    {Categories.map((value) => {
                                      return (
                                        <div className="col-lg-3 col-md-4 col-sm-6 mix women">
                                          <Link to={`/category-detail?cat_id=${value._id}`}>
                                            <div className="product__item">
                                              <div
                                                className="product__item__pic set-bg"
                                                // data-setbg="img/product/product-1.jpg"
                                                style={{ backgroundImage: `url('http://localhost:8080/uploads/${value.image}')` }}
                        
                                              >
                                                <div className="label new">New</div>
                                                <ul className="product__hover">
                                                  <li>
                                                    <a href="img/product/product-1.jpg" className="image-popup">
                                                      <span className="arrow_expand" />
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="#">
                                                      <span className="icon_heart_alt" />
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="#">
                                                      <span className="icon_bag_alt" />
                                                    </a>
                                                  </li>
                                                </ul>
                                              </div>
                                              <div className="product__item__text">
                                                <h6>
                                                  <a href="#">{value.name}</a>
                                                </h6>
                                              </div>
                                            </div>
                                          </Link>
                                        </div>
                                      )
                                    })}
                        
                        
                                  </div>
                        
                    </div>
               
            </section>
            <Instagram/>
            <Footer/>
         
        </>

    )
}