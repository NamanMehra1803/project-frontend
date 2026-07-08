import React, { useEffect, useState } from "react";
import Header from "../../frontend copy/mainpage/Header";
import Footer from "../../frontend copy/mainpage/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Wishlist() {
  const isLoggedIn = Boolean(localStorage.getItem("user-token"));
  const [wishlistItems, setWishlistItems] = useState([]);
  
  const viewWishlist = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/view-wishlist/${user_id}`
      );
      if (response.data.success) {
        setWishlistItems(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeFromWishlist = async (wishlistItemId) => {
    const user_id = localStorage.getItem("user-id");
    try {
      await axios.post("http://localhost:8080/remove-from-wishlist", {
        _id: wishlistItemId,
      });
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "Product has been removed from your wishlist.",
        timer: 1500,
        showConfirmButton: false,
      });
      if (user_id) {
        viewWishlist(user_id);
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user-id");
    if (user_id) {
      viewWishlist(user_id);
    }
  }, []);

  return (
    <>
      <Header />
      {!isLoggedIn ? (
        <div
          className="container py-5 text-center"
          style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <h3>You need to log in to view your wishlist.</h3>
          <Link to="/user-loging" className="btn btn-primary mt-3 px-4 py-2" style={{ fontSize: "1.1rem" }}>
            Login
          </Link>
          <button className="btn btn-sm btn-outline-primary ms-2">
            <Link to="/user-loging">
              Log In
            </Link>
          </button>
        </div>
      ) : (
        <section
          className="container my-5"
          style={{ maxWidth: "1100px", margin: "auto" }}
        >
          <h2
            className="text-center fw-bold mb-5"
            style={{
              color: "#4a3c3a",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: "2.25rem",
              letterSpacing: "0.05em",
            }}
          >
            ❤️ Your Wishlist
          </h2>
          <div
            className="card p-5 shadow"
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
            }}
          >
            {wishlistItems.length === 0 ? (
              <p className="text-center text-muted fs-5 my-5">
                Your wishlist is empty!
              </p>
            ) : (
              <div className="table-responsive">
                <table
                  className="table align-middle"
                  style={{ minWidth: "700px" }}
                >
                  <thead
                    className="table-dark text-center"
                    style={{ borderRadius: "15px" }}
                  >
                    <tr>
                      <th style={{ width: "140px", borderTopLeftRadius: "15px" }}>
                        Image
                      </th>
                      <th style={{ textAlign: "left" }}>Product Name</th>
                      <th style={{ width: "120px" }}>Price</th>
                      <th style={{ width: "120px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((item) => (
                      <tr key={item._id} style={{ borderBottom: "1px solid #eee" }}>
                        <td className="text-center">
                          <img
                            src={`http://localhost:8080/uploads/${item.product_id.image}`}
                            alt={item.product_id.name}
                            style={{
                              width: "110px",
                              height: "130px",
                              objectFit: "cover",
                              borderRadius: "12px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                        </td>
                        <td
                          style={{
                            fontWeight: 600,
                            color: "#4a3c3a",
                            verticalAlign: "middle",
                            fontSize: "1.1rem",
                            paddingLeft: "1rem",
                            textAlign: "left",
                            whiteSpace: "normal",
                          }}
                        >
                          {item.product_id.name}
                        </td>
                        <td
                          style={{
                            verticalAlign: "middle",
                            fontSize: "1.1rem",
                            fontWeight: "500",
                          }}
                        >
                          ₹{item.product_id.price}
                        </td>
                        <td className="text-center" style={{ verticalAlign: "middle" }}>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeFromWishlist(item._id)}
                            style={{
                              borderRadius: "10px",
                              padding: "8px 18px",
                              fontWeight: "600",
                              fontSize: "0.95rem",
                              boxShadow: "0 3px 10px rgba(220, 53, 69, 0.4)",
                              transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = "#c82333")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = "#dc3545")
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
