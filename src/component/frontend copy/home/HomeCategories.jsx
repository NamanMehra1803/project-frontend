import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomeCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://https://my-backend-api-usbu.onrender.com/view-categories/frontend")
      .then((res) => {
        setCategories(res.data?.data || []);
      })
      .catch((err) => {
        console.error("Error:", err);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="cat-section">
        <div className="container">

          {/* 🔥 Center Dark Header */}
          <div className="header">
            <div className="title-card">
              <h4>New Categories</h4>
            </div>
          </div>

          {/* Loader */}
          {loading && <p className="loading">Loading...</p>}

          {/* Grid */}
          <div className="grid">
            {!loading && categories.length === 0 && (
              <p>No categories found</p>
            )}

            {categories.map((item) => (
              <Link
                key={item._id}
                to={`/category-detail?cat_id=${item._id}`}
                className="card"
              >
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(http://https://my-backend-api-usbu.onrender.com/uploads/${item.image})`,
                  }}
                >
                  <div className="overlay" />
                </div>

                <div className="content">
                  <h6>{item.name}</h6>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 🎨 Full CSS */}
      <style>{`
        .cat-section {
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
          box-shadow: 0 6px 15px rgba(0,0,0,0.25);
          transition: 0.3s;
        }

        .title-card h4 {
          margin: 0;
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .title-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.35);
        }

        /* Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 15px;
        }

        /* Card */
        .card {
          text-decoration: none;
          color: #000;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          transition: 0.3s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }

        .image {
          height: 140px;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
        }

        .content {
          padding: 10px;
          text-align: center;
        }

        .content h6 {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
        }

        /* Hover */
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .card:hover .overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        }

        /* Loader */
        .loading {
          text-align: center;
          padding: 20px;
        }

        /* Responsive */
        @media(max-width:768px){
          .image {
            height: 120px;
          }
        }
      `}</style>
    </>
  );
}