import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Utills/Header';
import Footer from '../Utills/Footer';
import Sidebar from '../Utills/Sidebar';
import { Modal, Button } from 'react-bootstrap';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Contact() {
    const [contactData, setContactData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch contact messages
    const contactview = async () => {
        try {
            const ApiUrl = 'http://https://my-backend-api-usbu.onrender.com/view-contact';
            const response = await axios.post(ApiUrl);
            if (Array.isArray(response.data.data)) {
                setContactData(response.data.data);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        contactview();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = contactData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(contactData.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    };

    // Show modal with selected contact details
    const handleViewMessage = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContact(null);
    };

    // Handle Delete functionality
    const handleDelete = async (user_Id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.post('http://https://my-backend-api-usbu.onrender.com/delete-contact', { _id: user_Id });
                    Swal.fire({ title: "Deleted!", text: "Your file has been deleted.", icon: "success" });
                    contactview();
                }
            });
        } catch { }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = contactData.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="layout-wrapper">
                <Sidebar />
                <div className="page-content">
                    <Header />
                    <div className="px-3">
                        <div className="container-fluid">
                            <div className="py-3 py-lg-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h4 className="page-title mb-0">CONTACT MANAGER</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-between">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="col-md-6 d-flex gap-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by Name or Email"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            style={{ width: '250px' }}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="container">
                                        <div className="table-responsive">
                                            <table className="table table-bordered border-dark table-hover text-center align-middle">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Message</th>
                                                        <th scope="col">Mobile</th>
                                                        <th scope="col">Created At</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredData.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="7">No contact messages found.</td>
                                                        </tr>
                                                    ) : (
                                                        filteredData.slice(indexOfFirstItem, indexOfLastItem).map((contact, index) => (
                                                            <tr key={contact._id}>
                                                                <th scope="row">{indexOfFirstItem + index + 1}</th>
                                                                <td>{contact.name}</td>
                                                                <td>{contact.email}</td>
                                                                <td>{contact.message}</td>
                                                                <td>{contact.phone}</td>
                                                                <td>{new Date(contact.createdAt).toLocaleDateString("en-US", {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}</td>
                                                                <td>
                                                                    <div className="m-1">
                                                                        <button
                                                                            className="btn btn-primary me-3 px-4"
                                                                            onClick={() => handleViewMessage(contact)}
                                                                        >
                                                                            View
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-danger px-4"
                                                                            onClick={() => handleDelete(contact._id)}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>

                                            {/* Pagination */}
                                            <div className="d-flex justify-content-center my-3">
                                                <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-outline-secondary mx-1">
                                                    Previous
                                                </button>

                                                {[...Array(totalPages).keys()].map((num) => (
                                                    <button
                                                        key={num}
                                                        onClick={() => handlePageClick(num + 1)}
                                                        className={`btn mx-1 ${currentPage === num + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                                                    >
                                                        {num + 1}
                                                    </button>
                                                ))}

                                                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-outline-secondary mx-1">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>

            {/* Modal for viewing contact details */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                size="lg"
                centered
                aria-labelledby="contact-modal-title"
                style={{ backdropFilter: 'blur(5px)' }}
            >
                <Modal.Header closeButton style={{ borderBottom: 'none', backgroundColor: '#f0f4f8', borderRadius: '12px 12px 0 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaEnvelopeOpenText size={28} color="#1976d2" />
                        <Modal.Title id="contact-modal-title" style={{ fontWeight: '700', color: '#1976d2' }}>
                            Contact Details
                        </Modal.Title>
                    </div>
                </Modal.Header>

                <Modal.Body style={{ backgroundColor: '#fff', borderRadius: '0 0 12px 12px', padding: '30px 25px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                    {selectedContact && (
                        <div style={{ lineHeight: 1.6, color: '#333' }}>
                            <p><strong style={{ color: '#1976d2' }}>Name:</strong> {selectedContact.name}</p>
                            <p><strong style={{ color: '#1976d2' }}>Email:</strong> {selectedContact.email}</p>
                            <p><strong style={{ color: '#1976d2' }}>Phone:</strong> {selectedContact.phone}</p>
                            <p><strong style={{ color: '#1976d2' }}>Message:</strong></p>
                            <p style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', fontStyle: 'italic', boxShadow: 'inset 0 0 5px #ddd' }}>
                                {selectedContact.message}
                            </p>
                            <p><strong style={{ color: '#1976d2' }}>Created At:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>

                            {selectedContact.image && (
                                <div style={{ marginTop: '20px' }}>
                                    <strong style={{ color: '#1976d2' }}>Image:</strong>
                                    <br />
                                    <img
                                        src={`http://https://my-backend-api-usbu.onrender.com/uploads/${selectedContact.image}`}
                                        alt="User"
                                        style={{
                                            width: '180px',
                                            height: 'auto',
                                            borderRadius: '15px',
                                            boxShadow: '0 4px 15px rgba(25, 118, 210, 0.25)',
                                            marginTop: '10px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer style={{ backgroundColor: '#f0f4f8', borderTop: 'none', borderRadius: '0 0 12px 12px' }}>
                    <Button
                        variant="outline-primary"
                        onClick={handleCloseModal}
                        style={{
                            fontWeight: '600',
                            borderRadius: '25px',
                            padding: '8px 25px',
                            letterSpacing: '0.5px',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1976d2', e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '', e.currentTarget.style.color = '')}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Contact;
