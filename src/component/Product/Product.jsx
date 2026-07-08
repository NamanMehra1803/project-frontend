import React, { useEffect, useState } from 'react';
import Header from '../Utills/Header';
import Footer from '../Utills/Footer';
import Sidebar from '../Utills/Sidebar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Product() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [productData, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [cat_id, setCat_id] = useState('');
    const [category, setCategory] = useState([]);

    const handleButtonClick = (user_data, user_id) => {
        navigate("/product-edit", { state: user_data, _id: user_id });
    };

    const productview = async () => {
        try {
            const response = await axios.post('http://localhost:8080/view-product');
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const categoryView = async () => {
        try {
            const response = await axios.post('http://localhost:8080/view-categoryes');
            if (response.data.success) {
                setCategory(response.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        productview();
        categoryView();
    }, []);

    const handleDelete = async (product_Id) => {
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
                await axios.post('http://localhost:8080/delete-product', { _id: product_Id });
                Swal.fire("Deleted!", "Product has been deleted.", "success");
                productview();
            }
        });
    };

    const searchProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/product-Search", { name, cat_id });
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        productview();
        setName('');
        setCat_id('');
    };

    const handleStatusUpdate = async (pro_Id) => {
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
                await axios.post('http://localhost:8080/product-status', { _id: pro_Id });
                Swal.fire("Updated!", "Status has been updated.", "success");
                productview();
            }
        });
    };

    // ✅ Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(productData.map((p, index) => ({
            "#": index + 1,
            "Name": p.name,
            "Price": p.price,
            "Category": p.cat_id?.name || 'N/A',
            "Description": p.description,
            "Status": p.status ? "Active" : "Inactive",
            "Created": new Date(p.createdAt).toLocaleDateString("en-US")
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "products_list.xlsx");
    };

    // ✅ Export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["#", "Name", "Price", "Category", "Description", "Status", "Created"];
        const tableRows = [];

        productData.forEach((p, index) => {
            const rowData = [
                index + 1,
                p.name,
                p.price,
                p.cat_id?.name || 'N/A',
                p.description,
                p.status ? "Active" : "Inactive",
                new Date(p.createdAt).toLocaleDateString("en-US")
            ];
            tableRows.push(rowData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text("Product List", 14, 15);
        doc.save("products_list.pdf");
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(productData.length / itemsPerPage);

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
                <Sidebar />
                <div className="page-content">
                    <Header />
                    <div className="px-3 container-fluid">
                        <div className="py-3 py-lg-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h4 className="page-title mb-0">PRODUCT MANAGER</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-between mb-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div className="d-flex align-items-center gap-3 flex-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search Product Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{ width: "200px" }}
                                    />
                                    <select
                                        id="category"
                                        value={cat_id}
                                        onChange={(e) => setCat_id(e.target.value)}
                                        className="form-select"
                                        style={{ width: "180px" }}
                                    >
                                        <option value="">Select Category</option>
                                        {category.map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button className="btn btn-success" onClick={searchProduct}>Search</button>
                                    <button className="btn btn-danger" onClick={handleReset}>Reset</button>
                                </div>

                                <div className="d-flex gap-2">
                                    <div className="d-flex justify-content-end mb-3">
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn"
                                                style={{
                                                    minWidth: '150px',
                                                    border: '2px solid #198754',
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
                                                    border: '2px solid #dc3545',
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

                                    <Link to="/product-add">
                                        <button className="btn btn-success">+ ADD PRODUCT</button>
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
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Description</th>
                                                <th>Created</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productData.length === 0 ? (
                                                <tr>
                                                    <td colSpan="9">No product found.</td>
                                                </tr>
                                            ) : (
                                                currentItems.map((product, index) => (
                                                    <tr key={product._id}>
                                                        <th>{indexOfFirstItem + index + 1}</th>
                                                        <td>
                                                            <img
                                                                src={`http://localhost:8080/uploads/${product.image}`}
                                                                alt={product.name}
                                                                style={{
                                                                    height: '40px',
                                                                    width: '40px',
                                                                    borderRadius: '20%',
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.cat_id?.name || "N/A"}</td>
                                                        <td>{product.description}</td>
                                                        <td>{new Date(product.createdAt).toLocaleDateString("en-US", {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => handleStatusUpdate(product._id)}
                                                                style={{
                                                                    width: '60px',
                                                                    height: '28px',
                                                                    borderRadius: '14px',
                                                                    border: 'none',
                                                                    backgroundColor: product.status ? '#28a745' : '#dc3545',
                                                                    position: 'relative',
                                                                    cursor: 'pointer',
                                                                    padding: 0
                                                                }}
                                                            >
                                                                <span
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '3px',
                                                                        left: product.status ? '32px' : '4px',
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
                                                                    onClick={() => handleButtonClick(product, product._id)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger px-3"
                                                                    onClick={() => handleDelete(product._id)}
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
