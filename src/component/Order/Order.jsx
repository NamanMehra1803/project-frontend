import React, { useEffect, useState } from 'react';
import Header from '../Utills/Header';
import Footer from '../Utills/Footer';
import Sidebar from '../Utills/Sidebar';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function OrderManager() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    const searchUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://my-backend-api-usbu.onrender.com/order-Search', { firstName, email });
            if (response.data.success) setOrders(response.data.data);
        } catch {
            // Handle error
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        setFirstName('');
        setEmail('');
        fetchOrders();
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.post('https://my-backend-api-usbu.onrender.com/orders-view');
            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (err) {
            // Handle error
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const exportToExcel = () => {
        const dataToExport = orders.map((order, index) => ({
            "#": index + 1,
            "User Name": `${order.user_id?.firstName || ''} ${order.user_id?.lastName || ''}`,
            "User Email": order.user_id?.email || '',
            "User Mobile": order.user_id?.mobile || '',
            "Product Name": order.product_id?.name || '',
            "Price": order.product_id?.price || '',
            "Created": new Date(order.createdAt).toLocaleDateString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "orders_list.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["#", "User", "Email", "Mobile", "Product", "Price", "Date"];
        const tableRows = [];

        orders.forEach((order, index) => {
            const row = [
                index + 1,
                `${order.user_id?.firstName || ''} ${order.user_id?.lastName || ''}`,
                order.user_id?.email || '',
                order.user_id?.mobile || '',
                order.product_id?.name || '',
                order.product_id?.price || '',
                new Date(order.createdAt).toLocaleDateString(),
            ];
            tableRows.push(row);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        doc.text("Order List", 14, 15);
        doc.save("orders_list.pdf");
    };

    return (
        <div className="layout-wrapper">
            <Sidebar />
            <div className="page-content">
                <Header />
                <div className="px-3 container-fluid">
                    <div className="py-3 py-lg-4">
                        <div className="row">
                            <div className="col-lg-6">
                                <h4 className="page-title mb-0">ORDER MANAGER</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                style={{ width: "180px", height: "38px" }}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                style={{ width: "180px", height: "38px" }}
                            />
                            <button
                                className="btn btn-success"
                                onClick={searchUser}
                                style={{ height: "38px", padding: "0 20px", marginTop: "-12px" }}
                            >
                                Search
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleReset}
                                style={{ height: "38px", padding: "0 20px", marginTop: "-12px" }}
                            >
                                Reset
                            </button>
                            {/* Add Export Buttons here */}
                            <div className="d-flex justify-content-end mb-2 gap-2">
                                <button
                                    className="btn"
                                    style={{
                                        minWidth: '150px',
                                        border: '2px solid #198754', // green border
                                        color: '#198754',
                                        backgroundColor: 'white',
                                        fontWeight: '500',
                                        borderRadius: '6px',
                                        transition: 'all 0.3s ease-in-out'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#198754';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = '#198754';
                                    }}
                                    onClick={exportToExcel}
                                >
                                    📊 Export to Excel
                                </button>

                                <button
                                    className="btn"
                                    style={{
                                        minWidth: '150px',
                                        border: '2px solid #dc3545', // red border
                                        color: '#dc3545',
                                        backgroundColor: 'white',
                                        fontWeight: '500',
                                        borderRadius: '6px',
                                        transition: 'all 0.3s ease-in-out'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#dc3545';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = '#dc3545';
                                    }}
                                    onClick={exportToPDF}
                                >
                                    🧾 Export to PDF
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-bordered border-dark table-hover text-center align-middle">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User Image</th>
                                        <th>User Info</th>
                                        <th>Product Image</th>
                                        <th>Products Info</th>
                                        <th>Create</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="8">No orders found.</td>
                                        </tr>
                                    ) : (
                                        currentItems.map((order, index) => (
                                            <tr key={order._id}>
                                                <td>{indexOfFirstItem + index + 1}</td>
                                                <td>
                                                    <img
                                                        src={`https://my-backend-api-usbu.onrender.com/uploads/${order.user_id?.image}`}
                                                        style={{
                                                            height: '40px',
                                                            width: '40px',
                                                            borderRadius: '20%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <div style={{ textAlign: 'left' }}><strong>Name:</strong> {order.user_id?.firstName} {order.user_id?.lastName}</div>
                                                    <div style={{ textAlign: 'left' }}><strong>Email:</strong> {order.user_id?.email}</div>
                                                    <div style={{ textAlign: 'left' }}><strong>Mobile:</strong> {order.user_id?.mobile}</div>
                                                </td>
                                                <td>
                                                    <img
                                                        src={`https://my-backend-api-usbu.onrender.com/uploads/${order.product_id?.image}`}
                                                        style={{
                                                            height: '40px',
                                                            width: '40px',
                                                            borderRadius: '20%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                </td>
                                                <td>
                                                    <div style={{ textAlign: 'left' }}><strong>Name:</strong> {order.product_id?.name}</div>
                                                    <div style={{ textAlign: 'left' }}><strong>Price:</strong> ₹{order.product_id?.price}</div>
                                                </td>
                                                <td>{new Date(order.createdAt).toLocaleDateString("en-US", {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</td>
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
                <Footer />
            </div>
        </div>
    );
}
