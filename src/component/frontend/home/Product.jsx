import React from 'react'

export default function Product() {
  return (
    <div>
      <>
  {/* Product Section Begin */}
  <section className="product spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <div className="section-title">
            <h4>New product</h4>
          </div>
        </div>
        <div className="col-lg-8 col-md-8">
          <ul className="filter__controls">
            <li className="active" data-filter="*">
              All
            </li>
            <li data-filter=".women">Women’s</li>
            <li data-filter=".men">Men’s</li>
            <li data-filter=".kid">Kid’s</li>
            <li data-filter=".accessories">Accessories</li>
            <li data-filter=".cosmetic">Cosmetics</li>
          </ul>
        </div>
      </div>
      <div className="row property__gallery">
        <div className="col-lg-3 col-md-4 col-sm-6 mix women">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
            //   data-setbg="img/product/product-1.jpg"
            style={{ backgroundImage: "url('/img/product/product-1.jpg')" }}
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
                <a href="#">Buttons tweed blazer</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 mix men">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
            //   data-setbg="img/product/product-2.jpg"
            style={{ backgroundImage: "url('/img/product/product-2.jpg')" }}
            >
              <ul className="product__hover">
                <li>
                  <a href="img/product/product-2.jpg" className="image-popup">
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
                <a href="#">Flowy striped skirt</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 49.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 mix accessories">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
            //   data-setbg="img/product/product-3.jpg"
            style={{ backgroundImage: "url('/img/product/product-3.jpg')" }}
            >
              <div className="label stockout">out of stock</div>
              <ul className="product__hover">
                <li>
                  <a href="img/product/product-3.jpg" className="image-popup">
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
                <a href="#">Cotton T-Shirt</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 mix cosmetic">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
            //   data-setbg="img/product/product-4.jpg"
            style={{ backgroundImage: "url('/img/product/product-4.jpg')" }}
            >
              <ul className="product__hover">
                <li>
                  <a href="img/product/product-4.jpg" className="image-popup">
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
                <a href="#">Slim striped pocket shirt</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 mix kid">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
            //   data-setbg="img/product/product-5.jpg"/
            style={{ backgroundImage: "url('/img/product/product-5.jpg')" }}
            >
              <ul className="product__hover">
                <li>
                  <a href="img/product/product-5.jpg" className="image-popup">
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
                <a href="#">Fit micro corduroy shirt</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 mix women men kid accessories cosmetic">
          <div className="product__item sale">
            <div
              className="product__item__pic set-bg"
            //   data-setbg="img/product/product-6.jpg"
            style={{ backgroundImage: "url('/img/product/product-6.jpg')" }}
            >
              <div className="label sale">Sale</div>
              <ul className="product__hover">
                <li>
                  <a href="img/product/product-6.jpg" className="image-popup">
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
                <a href="#">Tropical Kimono</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">
                $ 49.0 <span>$ 59.0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 mix women men kid accessories cosmetic">
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
            //   data-setbg="img/product/product-7.jpg"
            style={{ backgroundImage: "url('/img/product/product-7.jpg')" }}
            >
              <ul className="product__hover">
                <li>
                  <a href="img/product/product-7.jpg" className="image-popup">
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
                <a href="#">Contrasting sunglasses</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">$ 59.0</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 mix women men kid accessories cosmetic">
          <div className="product__item sale">
            <div
              className="product__item__pic set-bg"
            //   data-setbg="img/product/product-8.jpg"
            style={{ backgroundImage: "url('/img/product/product-8.jpg')" }}
            >
              <div className="label">Sale</div>
              <ul className="product__hover">
                <li>
                  <a href="img/product/product-8.jpg" className="image-popup">
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
                <a href="#">Water resistant backpack</a>
              </h6>
              <div className="rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="product__price">
                $ 49.0 <span>$ 59.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Product Section End */}
</>

    </div>
  )
}
