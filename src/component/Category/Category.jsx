import React, { useEffect, useState } from 'react';
import Header from '../Utills/Header';
import Footer from '../Utills/Footer';
import Sidebar from '../Utills/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Category() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [categoryData, setUserData] = useState([]);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleButtonClick = (user_data, user_id) => {
        navigate("/category-edit", { state: user_data, _id: user_id });
    };

    const categoryview = async () => {
        try {
            const response = await axios.post('http://localhost:8080/view-category');
            if (Array.isArray(response.data.data)) {
                setUserData(response.data.data);
            } else {
                toast.error(response.data.message || "Failed to fetch categories");
            }
        } catch (err) {
            toast.error("Something went wrong while fetching categories.");
        }
    };

    useEffect(() => {
        categoryview();
    }, []);

    const handleDelete = async (cat_Id) => {
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
                await axios.post('http://localhost:8080/delete-category', { _id: cat_Id });
                Swal.fire("Deleted!", "Your category has been deleted.", "success");
                categoryview();
            }
        });
    };

    const searchCat = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/serach-category", { name });
            if (response.data.success) {
                setUserData(response.data.data);
            }
        } catch (err) {
            toast.error("Search failed. Please try again.");
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        categoryview();
        setName("");
    };

    const handleStatusUpdate = async (cat_Id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to update status?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.post('http://localhost:8080/category-status', { _id: cat_Id });
                Swal.fire("Updated!", "Status has been updated.", "success");
                categoryview();
            }
        });
    };
    // ✅ Export to Excel
    const exportToExcel = () => {
        const dataToExport = categoryData.map((category, index) => ({
            "#": index + 1,
            "Name": category.name || '',
            "Description": category.description || '',
            "Status": category.status ? "Active" : "Inactive",
            "Created": new Date(category.createdAt).toLocaleDateString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "categories.xlsx");
    };

    // ✅ Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["#", "Name", "Description", "Status", "Created"];
        const tableRows = [];

        categoryData.forEach((category, index) => {
            const row = [
                index + 1,
                category.name || '',
                category.description || '',
                category.status ? "Active" : "Inactive",
                new Date(category.createdAt).toLocaleDateString()
            ];
            tableRows.push(row);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text("Category List", 14, 15);
        doc.save("categories.pdf");
    };


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categoryData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(categoryData.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    };

    return (
        <>
            <div className="layout-wrapper">
                <Toaster position="top-center" reverseOrder={false} />
                <Sidebar />
                <div className="page-content">
                    <Header />
                    <div className="px-3 container-fluid">
                        <div className="py-3 py-lg-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h4 className="page-title mb-0">CATEGORY MANAGER</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-between mb-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-flex align-items-center gap-3 flex-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search Category Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{ width: "200px" }}
                                    />
                                    <button className="btn btn-success" onClick={searchCat}>Search</button>
                                    <button className="btn btn-danger" onClick={handleReset}>Reset</button>
                                </div>
                                <div className="d-flex gap-2" >
                                    <div className="d-flex justify-content-end mb-3">
                                        <div className="d-flex gap-2">
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
                                    <Link to="/category-add">
                                        <button className="btn btn-success">+ ADD CATEGORY</button>
                                    </Link>
                                </div>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered border-dark table-hover text-center align-middle">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Created</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7">No category found.</td>
                                                </tr>
                                            ) : (
                                                currentItems.map((category, index) => (
                                                    <tr key={category._id}>
                                                        <th>{indexOfFirstItem + index + 1}</th>
                                                        <td>
                                                            <img
                                                                src={`http://localhost:8080/uploads/${category.image}`}
                                                                alt={category.name || "No image"}
                                                                style={{
                                                                    height: '40px',
                                                                    width: '40px',
                                                                    borderRadius: '20%',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                        </td>
                                                        <td>{category.name}</td>
                                                        <td>{category.description}</td>
                                                        <td>
                                                            {new Date(category.createdAt).toLocaleDateString("en-US", {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => handleStatusUpdate(category._id)}
                                                                style={{
                                                                    width: '60px',
                                                                    height: '28px',
                                                                    borderRadius: '14px',
                                                                    border: 'none',
                                                                    backgroundColor: category.status ? '#28a745' : '#dc3545',
                                                                    position: 'relative',
                                                                    cursor: 'pointer',
                                                                    padding: 0,
                                                                }}
                                                            >
                                                                <span
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '3px',
                                                                        left: category.status ? '32px' : '4px',
                                                                        width: '22px',
                                                                        height: '22px',
                                                                        backgroundColor: '#fff',
                                                                        borderRadius: '50%',
                                                                        transition: 'left 0.3s',
                                                                    }}
                                                                />
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-center">
                                                                <button
                                                                    className="btn btn-primary me-2 px-3"
                                                                    onClick={() => handleButtonClick(category, category._id)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger px-3"
                                                                    onClick={() => handleDelete(category._id)}
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
                    <Footer />
                </div>
            </div>
        </>
    );
}
