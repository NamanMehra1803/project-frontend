import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Header from "../../frontend copy/mainpage/Header";
import Footer from "../../frontend copy/mainpage/Footer";

const MyProfile = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    secureLocalStorage.clear();
    navigate("/user-loging");
    window.location.reload();
  };

  const [userData, setUserData] = useState({});
  const viewProfile = async (userId) => {
    try {
      const body = { _id: userId };
      const ApiUrl = "http://www.my-backend-api-usbu.onrender.com/api/user/my-profile";
      const response = await axios.post(ApiUrl, body);
      if (response.data.success) {
        setUserData(response.data.data);
      }
    } catch (err) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user-id");
    viewProfile(userId);
  }, []);

  return (
    <>
      <Header />
      <section
        className="container my-5"
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #d9e8ff 100%)",
          padding: "60px 40px",
          borderRadius: 15,
          maxWidth: "100%",
          margin: "auto",
          boxSizing: "border-box",
        }}
      >
        <div
          className="profile-card p-5"
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            maxWidth: "1200px",
            margin: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
          }}
        >
          <div className="d-flex flex-column flex-md-row align-items-center">
            {/* Profile Image */}
            <div
              style={{
                flex: "0 0 220px",
                textAlign: "center",
                marginBottom: 25,
              }}
            >
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  padding: 6,
                  background:
                    "linear-gradient(135deg, #6a8df1, #8cb6ff, #a3c5ff)",
                  boxShadow:
                    "0 0 25px 5px rgba(108, 141, 241, 0.5), inset 0 0 12px #4d70e4",
                  display: "inline-block",
                }}
              >
                <img
                  src={userData.image || "https://via.placeholder.com/220"}
                  alt={`${userData.firstName} ${userData.lastName}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "5px solid white",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="ms-md-5 flex-grow-1" style={{ minWidth: 0 }}>
              <div className="text-center text-md-start">
                <h2 style={{ color: "#33475b", fontWeight: "700" }}>
                  {userData.firstName} {userData.lastName}
                </h2>
                <p
                  className="text-muted"
                  style={{ fontSize: "1.1rem", letterSpacing: "0.5px" }}
                >
                  {userData.email}
                </p>
              </div>

              <hr style={{ margin: "1.5rem 0" }} />

              {/* Personal Information */}
              <div>
                <h5
                  className="fw-bold mb-3"
                  style={{ color: "#33475b", letterSpacing: "0.5px" }}
                >
                  Personal Information
                </h5>
                <div className="row mb-3" style={{ fontSize: "1.05rem" }}>
                  <div className="col-md-6 mb-3 mb-md-0">
                    <p>
                      <strong>First Name:</strong> {userData.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {userData.lastName}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Phone Number:</strong> {userData.mobile}
                    </p>
                    <p>
                      <strong>DOB:</strong>{" "}
                      {userData.DOB
                        ? new Date(userData.DOB).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h5
                  className="fw-bold mb-3"
                  style={{ color: "#33475b", letterSpacing: "0.5px" }}
                >
                  Address
                </h5>
                <p style={{ fontSize: "1.05rem" }}>
                  {userData.address || "No address provided"}
                </p>
              </div>

              {/* Logout Button */}
              <div className="text-center text-md-start mt-4">
                <button
                  type="button"
                  className="btn btn-danger btn-lg px-4"
                  onClick={() => handlelogout()}
                  style={{
                    borderRadius: "30px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    boxShadow: "0 4px 12px rgba(220, 53, 69, 0.5)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#c82333")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#dc3545")
                  }
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MyProfile;
