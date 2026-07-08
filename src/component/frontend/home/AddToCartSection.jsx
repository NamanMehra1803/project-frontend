import React, { useEffect, useState } from "react";
import Header from "../../frontend copy/mainpage/Header";
import Footer from "../../frontend copy/mainpage/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Cart() {
  const isLoggedIn = Boolean(localStorage.getItem("user-token"));
  const [cartItems, setCartItems] = useState([]);


  const viewCart = async (user_id) => {
    try {
      const response = await axios.get(
        `http://https://my-backend-api-usbu.onrender.com/view-cart/${user_id}`
      );

      if (response.data.success) {
        setCartItems(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeFromCart = async (cartItemId) => {
    const user_id = localStorage.getItem("user-id");
    try {
      await axios.post('http://https://my-backend-api-usbu.onrender.com/remove-from-cart', { _id: cartItemId });
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "Product has been removed from your cart.",
        timer: 1500,
        showConfirmButton: false
      });
      if (user_id) {
        viewCart(user_id);
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };
  useEffect(() => {
    const user_id = localStorage.getItem("user-id");
    if (user_id) {
      viewCart(user_id);
    }
  }, []);


const placeOrder = async () => {
  const user_id = localStorage.getItem("user-id");
  if (!user_id || cartItems.length === 0) {
    toast.error("Cart is empty or user not logged in");
    return;
  }
  const confirm = await Swal.fire({
    title: 'Confirm Order',
    text: "Are you sure you want to place this order?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, place order',
    cancelButtonText: 'No, cancel',
  });

  if (!confirm.isConfirmed) {
    Swal.fire('Cancelled', 'Your order was not placed.', 'info');
    return;
  }

  try {
    for (const item of cartItems) {
      await axios.post("http://https://my-backend-api-usbu.onrender.com/order", {
        user_id,
        product_id: item.product_id._id,
      });
    }

    Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      text: 'Your order has been placed successfully.',
      showConfirmButton: false,
      timer: 2000
    });
    for (const item of cartItems) {
      await axios.post("http://https://my-backend-api-usbu.onrender.com/remove-from-cart", { _id: item._id });
    }
    viewCart(user_id);
  } catch (error) {
    toast.error("Failed to place order.");
  }
};

  return (
    <>
      <Header />
      {!isLoggedIn ? (
        <div className="container py-5 text-center">
          <h3>You need to log in to view your cart.</h3>
          <Link to="/user-loging" className="btn btn-primary mt-3">
            Login
          </Link>
        </div>
      ) : (
        <div className="container my-5">
          <h2
            className="text-center fw-bold mb-5"
            style={{
              color: "#4a3c3a",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            🛒 Your Shopping Cart
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="card shadow-sm rounded-4 p-4"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "15px",
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                }}
              >
                {cartItems.length === 0 ? (
                  <p className="text-center text-muted fs-5">
                    Your cart is empty!
                  </p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="d-flex align-items-center justify-content-between border-bottom py-4"
                        style={{
                          borderBottom: "1px solid #ddd",
                          padding: "20px 0",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={`http://https://my-backend-api-usbu.onrender.com/uploads/${item.product_id.image}`}
                            alt={item.product_id.name}
                            className="rounded-3 shadow-sm"
                            style={{
                              width: "90px",
                              height: "120px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="ms-3">
                            <h6
                              className="fw-bold mb-1"
                              style={{ color: "#4a3c3a" }}
                            >
                              {item.product_id.name}
                            </h6>
                            <p className="text-muted mb-0">
                              Qnt : {item.price}  {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <p
                            className="fw-bold mb-0"
                            style={{ color: "#4a3c3a" }}
                          >
                            ₹{item.product_id.price * item.quantity}
                          </p>
                          <button
                            className="btn btn-outline-danger btn-sm mt-2"
                            onClick={() => removeFromCart(item._id)}
                            style={{
                              borderRadius: "12px",
                              backgroundColor: "#ff4d4d",
                              color: "#fff",
                              padding: "5px 10px",
                            }}
                          >

                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="d-flex justify-content-between align-items-center mt-5">
                      <h5 className="fw-bold" style={{ color: "#4a3c3a" }}>
                        Total:
                      </h5>
                      <h5 className="fw-bold" style={{ color: "#4a3c3a" }}>
                        ₹
                        {cartItems.reduce(
                          (total, item) =>
                            total + item.product_id.price * item.quantity,
                          0
                        )}
                      </h5>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-primary w-100 rounded-pill fw-bold py-3 fs-5"
                        style={{
                          backgroundColor: "#4a3c3a",
                          border: "none",
                          letterSpacing: "1.2px",
                        }}
                        onClick={placeOrder} // ← Hook up the function here
                      >
                        Proceed to Checkout
                      </button>

                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
