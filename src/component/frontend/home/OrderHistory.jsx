import React, { useEffect, useState } from "react";
import Header from "../../frontend copy/mainpage/Header";
import Footer from "../../frontend copy/mainpage/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function OrderHistory() {
  const isLoggedIn = Boolean(localStorage.getItem("user-token"));
  const [orders, setOrders] = useState([]);

  const fetchOrders = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:8080/view-Order/${user_id}`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCancelOrder = async (OrderId) => {
    const user_id = localStorage.getItem("user-id");

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it"
    });
    if (confirm.isConfirmed) {
      try {
        await axios.post("http://localhost:8080/Cancel-from-Order", { _id: OrderId });
        Swal.fire({
          icon: "success",
          title: "Cancelled!",
          text: "Your order has been cancelled.",
          timer: 1500,
          showConfirmButton: false
        });
        if (user_id) {
          fetchOrders(user_id); // Refresh the list
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user-id");
    if (user_id) {
      fetchOrders(user_id);
    }
  }, []);

  const totalAmount = orders.reduce((acc, order) => acc + (order.product_id?.price || 0), 0);

  return (
    <>
      <Header />

      {!isLoggedIn ? (
        <div className="container py-5 text-center">
          <h3>You need to log in to view your order history.</h3>
          <Link to="/user-loging" className="btn btn-primary mt-3">
            Login
          </Link>
        </div>
      ) : (
        <div className="container my-5">
          <h2 className="text-center fw-bold mb-4" style={{ color: "#333" }}>
            📦 Your Orders
          </h2>

          {orders.length === 0 ? (
            <p className="text-center text-muted fs-5">You have not placed any orders yet.</p>
          ) : (
            <div className="row justify-content-center">
              <div className="col-lg-10">
                {orders.map((order, index) => (
                  <div
                    key={order._id || index}
                    className="mb-4 border rounded-4 shadow-sm p-4"
                    style={{ backgroundColor: "#fff" }}
                  >
                    {/* Top Row: Date and Status */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <small className="text-muted">ORDER PLACED</small>
                        <h6 className="mb-0">{new Date(order.createdAt).toLocaleDateString()}</h6>
                      </div>
                      <div>
                        <small className="text-muted">ORDER STATUS</small>
                        <h6 className="mb-0 text-success">Delivered</h6>
                      </div>
                      {/* <div>
                        <small className="text-muted">TOTAL</small>
                        <h6 className="mb-0">₹{order.product_id?.price}</h6>
                      </div> */}
                    </div>

                    <hr />

                    {/* Product Info */}
                    <div className="d-flex">
                      <img
                        src={`http://localhost:8080/uploads/${order.product_id?.image}`}
                        alt={order.product_id?.name}
                        style={{ width: "120px", height: "120px", objectFit: "contain" }}
                        className="me-4 rounded shadow-sm"
                      />
                      <div>
                        <h5 className="fw-bold">{order.product_id?.name}</h5>
                        <p className="text-muted mb-1">Price: ₹{order.product_id?.price}</p>
                        <p className="text-muted mb-1">Quantity: 1</p>
                        <p className="text-muted mb-1">
                          Delivered to: {order.user_id?.firstName} {order.user_id?.lastName}
                        </p>
                        <p className="text-muted mb-3">Email: {order.user_id?.email}</p>

                        {/* Cancel Button */}
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* ✅ Display Total Order Amount */}
                <div className="text-end mt-4">
                  <h5 className="fw-bold">
                    Total Spent on Orders: <span className="text-success">₹{totalAmount}</span>
                  </h5>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
}
