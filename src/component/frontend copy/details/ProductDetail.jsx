import React, { useEffect, useState } from "react";
import Header from "../mainpage/Header";
import Instagram from "../home/Instagram";
import Footer from "../mainpage/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);

  const _id = new URLSearchParams(window.location.search).get("_id");

  // ================= PRODUCT =================
  useEffect(() => {
    axios
      .post("http://https://my-backend-api-usbu.onrender.com/view-product-/frontend", { _id })
      .then((res) => setProduct(res.data?.data || {}))
      .catch(() => setProduct({}));
  }, []);

  // ================= CART LOAD =================
  useEffect(() => {
    const user_id = localStorage.getItem("user-id");
    if (!user_id) return;

    axios
      .get(`http://https://my-backend-api-usbu.onrender.com/view-cart/${user_id}`)
      .then((res) => {
        if (res.data.success) {
          const formatted = res.data.data.map((item) => ({
            _id: item.product_id._id,
            name: item.product_id.name,
            price: item.product_id.price,
            image: item.product_id.image,
            qty: item.quantity,
          }));

          setCartItems(formatted);
        }
      })
      .catch(() => setCartItems([]));
  }, []);

  // ================= ADD TO CART =================
  const handleAddToCart = async () => {
    const user_id = localStorage.getItem("user-id");

    if (!user_id) {
      toast.error("Please login first!");
      return;
    }

    try {
      const res = await axios.post("http://https://my-backend-api-usbu.onrender.com/Add-cart", {
        user_id,
        product_id: product._id,
        quantity: qty,
      });

      if (res.data.success) {
        toast.success("Cart updated");

        setCartItems((prev) => {
          const exists = prev.find((p) => p._id === product._id);

          if (exists) {
            return prev.map((p) =>
              p._id === product._id
                ? { ...p, qty: p.qty + qty }
                : p
            );
          }

          return [
            ...prev,
            {
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              qty,
            },
          ];
        });

        setQty(1);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ================= REMOVE =================
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i._id !== id));
    toast.success("Removed");
  };

  // ⭐ TOTAL QTY CALC
  const totalCartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <Header />
      <Toaster />

      <section className="product">

        <div className="container">
          <div className="row">

            {/* IMAGE */}
            <div className="col">
              <img
                src={`http://https://my-backend-api-usbu.onrender.com/uploads/${product.image}`}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </div>

            {/* DETAILS */}
            <div className="col">
              <h2>{product.name}</h2>
              <h4>₹{product.price}</h4>

              <p>{product.description}</p>

              {/* QTY SELECTOR */}
              <div className="qty-box">
                <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>
                  -
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>
                  +
                </button>
              </div>

              {/* ⭐ CART BUTTON WITH BADGE */}
              <button className="cart-btn" onClick={handleAddToCart}>
                🛒 Add to Cart

                {/* BADGE */}
                <span className="badge">
                  {totalCartQty}
                </span>
              </button>
            </div>

          </div>

          {/* CART LIST */}
          <div className="cart-box">
            <h3>🛒 Cart Items</h3>

            {cartItems.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="cart-item">

                  <img src={`http://https://my-backend-api-usbu.onrender.com/uploads/${item.image}`} />

                  <div>
                    <h5>{item.name}</h5>
                    <p>Qty: {item.qty}</p>
                    <p>₹{item.price * item.qty}</p>
                  </div>

                  <button onClick={() => removeItem(item._id)}>
                    ❌
                  </button>

                </div>
              ))
            )}
          </div>

        </div>
      </section>

      <Instagram />
      <Footer />

      {/* 🎨 STYLE */}
      <style>{`
        .qty-box {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 15px 0;
        }

        .qty-box button {
          width: 35px;
          height: 35px;
          border: none;
          background: #111;
          color: #fff;
          font-size: 18px;
          border-radius: 6px;
          cursor: pointer;
        }

        .qty-box span {
          font-size: 18px;
          font-weight: bold;
        }

        /* CART BUTTON */
        .cart-btn {
          position: relative;
          padding: 10px 20px;
          background: orange;
          border: none;
          color: #fff;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        }

        /* ⭐ BADGE */
        .badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: red;
          color: #fff;
          width: 22px;
          height: 22px;
          font-size: 12px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .cart-box {
          margin-top: 40px;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 10px;
        }

        .cart-item {
          display: flex;
          gap: 10px;
          align-items: center;
          background: #fff;
          margin-top: 10px;
          padding: 10px;
          border-radius: 8px;
          justify-content: space-between;
        }

        .cart-item img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
        }

        .cart-item button {
          background: crimson;
          border: none;
          color: #fff;
          padding: 5px 10px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}