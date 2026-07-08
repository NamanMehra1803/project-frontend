import React, { useState } from 'react'
import Instagram from '../home/Instagram'
import Footer from '../mainpage/Footer'
import Header from '../mainpage/Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://https://my-backend-api-usbu.onrender.com/add-contact', {
        name,
        email,
        phone,
        message,
      })
      const msg = response.data.message;
      if (response.data.success) {
        toast.success(msg);
        setTimeout(() => navigate('/'), 2000)
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
      } else {
        toast.error(response.data.message || 'Failed to send message')
      }
    } catch (err) {
        // toast.error(msg);
    }
  }

  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to={'/'}>
                  <i className="fa fa-home" /> Home
                </Link>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__content">
                <div className="contact__address">
                  <h5>Contact info</h5>
                  <ul>
                    <li>
                      <h6>
                        <i className="fa fa-map-marker" /> Address
                      </h6>
                      <p>160 Pennsylvania Ave NW, Washington, Castle, PA 16101-5161</p>
                    </li>
                    <li>
                      <h6>
                        <i className="fa fa-phone" /> Phone
                      </h6>
                      <p>
                        <span>125-711-811</span>
                        <span>125-668-886</span>
                      </p>
                    </li>
                    <li>
                      <h6>
                        <i className="fa fa-headphones" /> Support
                      </h6>
                      <p>Support.photography@gmail.com</p>
                    </li>
                  </ul>
                </div>
                <div className="contact__form">
                  <h5>SEND MESSAGE</h5>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <textarea
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                    <button type="submit" className="site-btn">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="contact__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48158.305462977965!2d-74.13283844036356!3d41.02757295168286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e440473470d7%3A0xcaf503ca2ee57958!2sSaddle%20River%2C%20NJ%2007458%2C%20USA!5e0!3m2!1sen!2sbd!4v1575917275626!5m2!1sen!2sbd"
                  height={780}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Instagram />
      <Footer />
    </>
  )
}
