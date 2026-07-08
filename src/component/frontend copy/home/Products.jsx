import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Products() {
  const isLoggedIn = Boolean(localStorage.getItem("user-token"));
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/view-products/frontend")
      .then((res) => {
        setProducts(res.data?.data || []);
      })
      .catch(() => setProducts([]));
  }, []);

  const handleAddToCart = async (e, product_id) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user-id");
    if (!user_id) return toast.error("Please login first!");

    try {
      const res = await axios.post("http://localhost:8080/Add-cart", {
        user_id,
        product_id,
        quantity: 1,
      });

      res.data.success
        ? toast.success(res.data.message)
        : toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddToWishlist = async (e, product_id) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user-id");
    if (!user_id) return toast.error("Please login first!");

    try {
      const res = await axios.post("http://localhost:8080/add-wishlist", {
        user_id,
        product_id,
      });

      res.data.success
        ? toast.success(res.data.message)
        : toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <section className="product-section">
        <Toaster position="top-center" />

        <div className="container">

          {/* Header */}
          <div className="header">
            <div className="title-card">
              <h4>New Products</h4>
            </div>
          </div>

          {/* Grid */}
          <div className="grid">
            {products.map((p) => (
              <div key={p._id} className="card">

                {/* Image */}
                <Link to={`/product-detail?_id=${p._id}`}>
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url(http://localhost:8080/uploads/${p.image})`,
                    }}
                  >
                    <span className="badge">New</span>
                  </div>
                </Link>

                {/* Info */}
                <div className="info">
                  <h5>{p.name}</h5>

                  <div className="price">₹{p.price}</div>

                  <div className="actions">
                    {isLoggedIn && (
                      <>
                        <button
                          onClick={(e) => handleAddToWishlist(e, p._id)}
                        >
                          ❤️
                        </button>

                        <button
                          onClick={(e) => handleAddToCart(e, p._id)}
                        >
                          🛒
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎨 CSS */}
      <style>{`
        .product-section {
          padding: 30px 0;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
        }

        .title-card {
          background: linear-gradient(135deg, #111, #2c2c2c);
          padding: 12px 30px;
          border-radius: 30px;
          color: #fff;
          box-shadow: 0 6px 15px rgba(0,0,0,0.25);
        }

        .title-card h4 {
          margin: 0;
          font-size: 18px;
        }

        /* Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 18px;
        }

        /* Card */
        .card {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        /* Image */
        .img {
          height: 180px;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #000;
          color: #fff;
          padding: 4px 10px;
          font-size: 11px;
          border-radius: 20px;
        }

        /* Info */
        .info {
          padding: 12px;
          text-align: center;
        }

        .info h5 {
          font-size: 14px;
          margin: 5px 0;
        }

        .price {
          font-weight: 600;
          color: #111;
          margin-bottom: 10px;
        }

        /* Actions */
        .actions {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .actions button {
          border: none;
          background: #f2f2f2;
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          font-size: 16px;
        }

        .actions button:hover {
          background: #111;
          color: #fff;
        }
      `}</style>
    </>
  );
}