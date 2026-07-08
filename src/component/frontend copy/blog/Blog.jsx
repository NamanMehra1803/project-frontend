import React from 'react'
import Footer from '../mainpage/Footer'
import Header from '../mainpage/Header'
import Instagram from '../home/Instagram'
import { Link } from 'react-router-dom'

export default function Blog() {
  return (
    <>  
      <Header />
      {/* Breadcrumb Begin */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to={"/"}>

                  <i className="fa fa-home" /> Home

                </Link>
                <span>Blog</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Blog Section Begin */}
      <section className="blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div
                  className="blog__item__pic large__item set-bg"
                  //   data-setbg="img/blog/blog-1.jpg"
                  style={{ backgroundImage: "url('img/blog/blog-1.jpg')" }}

                />
                <div className="blog__item__text">
                  <h6>
                    <a href="#">
                      No Bad Blood! The Reason Why Tamr Judge Finally Made Up
                      With...
                    </a>
                  </h6>
                  <ul>
                    <li>
                      by <span>Ema Timahe</span>
                    </li>
                    <li>Seb 17, 2019</li>
                  </ul>
                </div>
              </div>
              <div className="blog__item">
                <div
                  className="blog__item__pic set-bg"
                  style={{ backgroundImage: "url('img/blog/blog-7.jpg')" }}
                //   data-setbg="img/blog/blog-7.jpg"
                />
                <div className="blog__item__text">
                  <h6>
                    <a href="#">
                      Pot Party! See Farrah Abraham Flaunt Smoking Body At...
                    </a>
                  </h6>
                  <ul>
                    <li>
                      by <span>Ema Timahe</span>
                    </li>
                    <li>Seb 17, 2019</li>
                  </ul>
                </div>
              </div>
              <div className="blog__item">
                <div
                  className="blog__item__pic set-bg"
                  //   data-setbg="img/blog/blog-9.jpg"
                  style={{ backgroundImage: "url('img/blog/blog-9.jpg')" }}

                />
                <div className="blog__item__text">
                  <h6>
                    <a href="#">
                      CMT Awards 2019 Red Carpet Arrivals Carrie Underwood,
                      Sheryl...
                    </a>
                  </h6>
                  <ul>
                    <li>
                      by <span>Ema Timahe</span>
                    </li>
                    <li>Seb 17, 2019</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div
                  className="blog__item__pic set-bg"
                  //   data-setbg="img/blog/blog-2.jpg"
                  style={{ backgroundImage: "url('img/blog/blog-2.jpg')" }}

                />
                <div className="blog__item__text">
                  <h6>
                    <a href="#">
                      Amf Cannes Red Carpet Celebrities Kendall Jenner, Pamela...
                    </a>
                  </h6>
                  <ul>
                    <li>
                      by <span>Ema Timahe</span>
                    </li>
                    <li>Seb 17, 2019</li>
                  </ul>
                </div>
              </div>
              <div className="blog__item">
                <div
                  className="blog__item__pic set-bg"
                  //   data-setbg="img/blog/blog-4.jpg"
                  style={{ backgroundImage: "url('img/blog/blog-4.jpg')" }}

                />
                <div className="blog__item__text">
                  <h6>
                    <a href="#">
                      Ireland Baldwin Shows Off Trendy Ilse Valfre Tattoo At
                      Stagecoach...
                    </a>
                  </h6>
                  <ul>
                    <li>
                      by <span>Ema Timahe</span>
                    </li>
                    <li>Seb 17, 2019</li>
                  </ul>
                </div>
              </div>
              <div className="blog__item">
                <div
                  className="blog__item__pic set-bg"
                  //   data-setbg="img/blog/blog-8.jpg"
                  style={{ backgroundImage: "url('img/blog/blog-8.jpg')" }}

                />
                <div className="blog__item__text">
                  <h6>
                    <a href="#">
                      Kim Kardashian Steps Out In Paris Wearing Shocking Sparkly...
                    </a>
                  </h6>
                  <ul>
                    <li>
                      by <span>Ema Timahe</span>
                    </li>
                    <li>Seb 17, 2019</li>
                  </ul>
                </div>
              </div>
              <div className="blog__item">
                <div
                  className="blog__item__pic set-bg"
                  //   data-setbg="img/blog/blog-10.jpg"
                  style={{ backgroundImage: "url('img/blog/blog-10.jpg')" }}

                />
                <div className="blog__item__text">
                  <h6>
                    <a href="#">
                      A-list Battle! Angelina Jolie &amp; Lady Gaga Fighting Over
                      Who...
                    </a>
                  </h6>
                  <ul>
                    <li>
                      by <span>Ema Timahe</span>
                    </li>
                    <li>Seb 17, 2019</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="blog__item">
                <div
                  className="blog__item__pic set-bg"
                  //   data-setbg="img/blog/blog-3.jpg"
                  style={{ backgroundImage: "url('img/blog/blog-3.jpg')" }}

                />
                <div className="blog__item__text">
                  <h6>
                    <a href="#">
                      Gigi Hadid, Rita Ora, Serena &amp; Other Hot Celebs Stun At
                      2019...
                    </a>
                  </h6>
                  <ul>
                    <li>
                      by <span>Ema Timahe</span>
                    </li>
                    <li>Seb 17, 2019</li>
                  </ul>
                </div>
              </div>
              <div className="blog__item">
                <div
                  className="blog__item__pic set-bg"
                  //   data-setbg="img/blog/blog-5.jpg"
                  style={{ backgroundImage: "url('img/blog/blog-5.jpg')" }}

                />
                <div className="blog__item__text">
                  <h6>
                    <a href="#">
                      Billboard Music Awards: Best, Worst &amp; Wackiest Dresses On
                      The...
                    </a>
                  </h6>
                  <ul>
                    <li>
                      by <span>Ema Timahe</span>
                    </li>
                    <li>Seb 17, 2019</li>
                  </ul>
                </div>
              </div>
              <div className="blog__item">
                <div
                  className="blog__item__pic large__item set-bg"
                  //   data-setbg="img/blog/blog-6.jpg"
                  style={{ backgroundImage: "url('img/blog/blog-6.jpg')" }}

                />
                <div className="blog__item__text">
                  <h6>
                    <a href="#">
                      Stephanie Pratt Busts Out Of Teeny Black Bikini During
                      Hawaii...
                    </a>
                  </h6>
                  <ul>
                    <li>
                      by <span>Ema Timahe</span>
                    </li>
                    <li>Seb 17, 2019</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <a href="#" className="primary-btn load-btn">
                Load more posts
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Section End */}
      <Instagram />
      <Footer />
    </>

  )
}
