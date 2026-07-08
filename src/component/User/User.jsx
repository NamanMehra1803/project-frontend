import React, { useEffect, useState } from 'react';
import Header from '../Utills/Header';
import Footer from '../Utills/Footer';
import Sidebar from '../Utills/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function User() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    const Userview = async () => {
        try {
            const response = await axios.post('http://https://my-backend-api-usbu.onrender.com/userview');
            if (Array.isArray(response.data.data)) setUserData(response.data.data);
        } catch {}
    };

    const searchUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://https://my-backend-api-usbu.onrender.com/userSearch', { firstName, email });
            if (response.data.success) setUserData(response.data.data);
        } catch {}
    };

    useEffect(() => { Userview(); }, []);

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
                    await axios.post('http://https://my-backend-api-usbu.onrender.com/api/admin/userdelete', { _id: user_Id });
                    Swal.fire({ title: "Deleted!", text: "Your file has been deleted.", icon: "success" });
                    Userview();
                }
            });
        } catch {}
    };

    const handleStatusUpdate = async (user_Id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to status update",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.post('http://https://my-backend-api-usbu.onrender.com/statusUpdate', { _id: user_Id });
                    Swal.fire({ title: "Update!", text: "The status has been successfully updated", icon: "success" });
                    Userview();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'The status update was cancelled.', 'error');
                }
            });
        } catch {}
    };

    const handleButtonClick = (user_data) => navigate('/users-edit', { state: user_data });
    const handleReset = (e) => { e.preventDefault(); setFirstName(''); setEmail(''); Userview(); };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(userData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "users_list.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["#", "First Name", "Last Name", "Email", "Mobile", "Status"];
        const tableRows = userData.map((user, index) => [
            index + 1, user.firstName, user.lastName, user.email, user.mobile, user.status ? "Active" : "Inactive"
        ]);
        autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
        doc.text("User List", 14, 15);
        doc.save("users_list.pdf");
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(userData.length / itemsPerPage);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const handlePageClick = (pageNum) => setCurrentPage(pageNum);

    return (
        <div className="layout-wrapper">
            <Sidebar />
            <div className="page-content">
                <Header />
                <div className="px-3 container-fluid">
                    <div className="py-3 py-lg-4">
                        <div className="row"><div className="col-lg-6"><h4 className="page-title mb-0"> USERS MANAGER</h4></div></div>
                    </div>

                    <div className="row justify-content-between">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                <input type="text" className="form-control" placeholder="Search First Name" value={firstName} onChange={e => setFirstName(e.target.value)} style={{ width: "180px", height: "38px" }} />
                                <input type="text" className="form-control" placeholder="Search Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "180px", height: "38px" }} />
                                <button className="btn btn-success" onClick={searchUser} style={{ height: "38px", padding: "0 20px", marginTop: "-12px" }}>Search</button>
                                <button className="btn btn-danger" onClick={handleReset} style={{ height: "38px", padding: "0 20px", marginTop: "-12px" }}>Reset</button>
                            </div>

                            <div className="d-flex gap-2">
                                <div className="d-flex justify-content-end mb-3">
                                    <div className="d-flex gap-2">
                                        <button className="btn" style={{ minWidth: '150px', border: '2px solid #198754', color: '#198754', backgroundColor: 'white', fontWeight: '500', borderRadius: '6px', transition: 'all 0.3s ease-in-out' }}
                                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#198754'; e.currentTarget.style.color = 'white'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#198754'; }}
                                            onClick={exportToExcel}>
                                            📊 Export to Excel
                                        </button>

                                        <button className="btn" style={{ minWidth: '150px', border: '2px solid #dc3545', color: '#dc3545', backgroundColor: 'white', fontWeight: '500', borderRadius: '6px', transition: 'all 0.3s ease-in-out' }}
                                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#dc3545'; e.currentTarget.style.color = 'white'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#dc3545'; }}
                                            onClick={exportToPDF}>
                                            🧾 Export to PDF
                                        </button>
                                    </div>
                                </div>
                                <Link to="/users-add"><button className="btn btn-success" style={{ marginRight: "26px", paddingRight: "30px", paddingLeft: "30px", marginTop: "-2px" }}>+ ADD USER</button></Link>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12 table-responsive">
                                <table className="table table-bordered border-dark table-hover text-center align-middle">
                                    <thead>
                                        <tr><th>#</th><th>Image</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Mobile</th><th>Created</th><th>Status</th><th>Action</th></tr>
                                    </thead>
                                    <tbody>
                                        {userData.length === 0 ? <tr><td colSpan="8">No users found.</td></tr> :
                                            currentItems.map((user, index) => (
                                                <tr key={user._id}>
                                                    <th>{indexOfFirstItem + index + 1}</th>
                                                    <td><img src={`http://https://my-backend-api-usbu.onrender.com/uploads/${user.image}`} alt={user.firstName || "No image"} style={{ height: '40px', width: '40px', borderRadius: '20%', objectFit: 'cover' }} /></td>
                                                    <td>{user.firstName}</td>
                                                    <td>{user.lastName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.mobile}</td>
                                                    <td>{new Date(user.createdAt).toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                                    <td>
                                                        <button onClick={() => handleStatusUpdate(user._id)} style={{
                                                            width: '60px', height: '28px', borderRadius: '14px', border: 'none',
                                                            backgroundColor: user.status ? '#28a745' : '#dc3545',
                                                            position: 'relative', cursor: 'pointer', padding: '0'
                                                        }}>
                                                            <span style={{
                                                                position: 'absolute', top: '3px',
                                                                left: user.status ? '32px' : '4px',
                                                                width: '22px', height: '22px', backgroundColor: '#fff',
                                                                borderRadius: '50%', transition: 'left 0.3s',
                                                            }} />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <div className="m-1">
                                                            <button className="btn btn-primary me-3 px-4" onClick={() => handleButtonClick(user)}>Edit</button>
                                                            <button className="btn btn-danger px-4" onClick={() => handleDelete(user._id)}>Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>

                                <div className="d-flex justify-content-center my-3">
                                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-outline-secondary mx-1">Previous</button>
                                    {[...Array(totalPages).keys()].map(num => (
                                        <button key={num} onClick={() => handlePageClick(num + 1)} className={`btn mx-1 ${currentPage === num + 1 ? 'btn-primary' : 'btn-outline-primary'}`}>{num + 1}</button>
                                    ))}
                                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-outline-secondary mx-1">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default User;
