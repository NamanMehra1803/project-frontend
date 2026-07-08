import React, { useEffect, useState, useMemo } from 'react'
import { Fragment } from 'react'
import Header from '../Utills/Header'
import Footer from '../Utills/Footer'
import Sidebar from '../Utills/Sidebar'
import Axios from '../../Confing/axios'
import Table from '../../Table/Table'
import { toast } from 'react-toastify'

function Review() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [serach, setSerach] = useState('')


    const handlePagination = (pagination) => {
        setIsLoading(true)
        Axios.get(`admin/get-review-list?page=${pagination?.pageIndex + 1}&limit=${pagination?.pageSize}&searchTerm=${serach}`).then((res) => {
            if (res.data.status) {
                setData(res?.data?.data)
                setIsLoading(false)
                // setPagination(res.data.totalItems)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        if (serach.length >= 0) {
            handlePagination()
        }
    }, [serach])
    const handledelete = (id) => {
        const data = {
            id: id
        }
        Axios.post("admin/delete-review-list", data).then((res) => {
            console.log(res.data)
            if (res?.data?.status) {
                toast.success(res?.data?.message)
                setSerach('')
            }else{
                toast.error(res.data.message)
                // toast.error(res.data.)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'S.NO',
                header: 'S.NO',
                accessorFn: (row, index) => {
                    return index + 1;
                },
                size:150
            },
            {
                accessorKey: 'name',
                header: 'Name',
                enableEditing: false,
                size:150

            },
            {
                accessorKey: 'review',
                header: 'Review',
                enableEditing: false,
                size:150

            },
            {
                accessorKey: 'rating',
                header: 'Rating',
                size:150

            },
            {
                accessorKey: 'likes',
                header: 'Likes',
                size:150

            },
            {
                accessorKey: 'dislikes',
                header: 'Dislikes',
                size: 150,
            },


            {
                accessorKey: 'createdAt',
                header: 'Created At',
                accessorFn: (row) => {
                    return new Date(row.createdAt).toLocaleDateString()
                },
                size:150

            },
            {
                accessorKey: 'updatedAt',
                header: 'Updated At',
                accessorFn: (row) => {
                    return new Date(row.updatedAt).toLocaleDateString()
                },
                size:150

            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                accessorFn: (row, index) => {
                    return (
                        <div>
                            <button className="btn btn-danger" onClick={() => handledelete(row.id)} >Delete</button>
                        </div>
                    );
                },
                size:150

            },
        ],

    );
    return (
        <Fragment>
            <div className="layout-wrapper">
                <Sidebar />
                <div className="page-content">
                    <Header />
                    <div className="px-3">
                        {/* Start Content*/}
                        <div className="container-fluid">
                            {/* start page title */}
                            <div className="py-3 py-lg-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h4 className="page-title mb-0"> Review Care And Doctors </h4>
                                    </div>
                                </div>
                            </div>
                            {/* <a className='btn btn-primary' onClick={() => setOpen(true)}>Create New</a> */}
                            <div className="row justify-content-between">
                                {/* <h4 className="page-title mb-0"> Comfortable Withs</h4> */}
                                <div className='col-md-4'> <input text="search" className="form-control" placeholder='search ' onChange={(e) => setSerach(e.target.value)} /></div>
                                <div class="input-group mb-3">
                                </div>
                                <div className='row'>
                                    <Table columns={columns} data={data} isLoading={isLoading} handlePagination={handlePagination} />
                                </div>
                            </div>
                        </div> {/* container */}
                    </div>
                    <Footer />
                </div>
            </div>


        </Fragment>
    )
}

export default Review