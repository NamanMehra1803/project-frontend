import React, { useEffect, useState, useMemo } from 'react'
import { Fragment } from 'react'
import Header from '../Utills/Header'
import Footer from '../Utills/Footer'
import Sidebar from '../Utills/Sidebar'
import Axios from '../../Confing/axios'
import Table from '../../Table/Table'
import { reorderColumn } from 'material-react-table'


function Doctors() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [serach, setSerach] = useState("")

    const handlePagination = (pagination) => {
        setIsLoading(true)
        Axios.get(`admin/get-all-doctors?page=${pagination?.pageIndex + 1}&limit=${pagination?.pageSize}&searchTerm=${serach}`).then((res) => {
            if (res?.data?.status) {
                setIsLoading(false)
                setData(res?.data?.data)
            }
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }
    useEffect(() => {
        if (serach.length >= 1) {
            handlePagination()
        }
    }, [serach])
    const columns = useMemo(
        () => [
            {
                accessorKey: 'S.NO',
                header: 'S.NO',
                accessorFn: (row, index) => {
                    return index + 1;
                },
                size: 50
            },
            {
                accessorKey: 'name',
                header: 'Name',
                accessorFn: (row) => {
                    return row?.name == null ? "No Name" : row?.name
                },

                size: 160
            },
            {
                accessorKey: 'officeNumber',
                header: 'Mobile',
                enableEditing: false,

                size: 150
            },
            {
                accessorKey: 'price',
                header: 'price',
                accessorFn: (row) => {
                    return row?.price == null ? "No Number" : row.price
                },

                size: 150
            },
            {
                accessorKey: 'latitude',
                header: 'Latitude',
                accessorFn: (row) => {
                    return row?.latitude == null ? "No Number" : row.latitude
                },

                size: 150
            },
            {
                accessorKey: 'longitude',
                header: 'Longitude',
                accessorFn: (row) => {
                    return row?.longitude == null ? "No Number" : row.longitude
                },

                size: 150
            },
            {
                accessorKey: 'profileId',
                header: 'Image',
                accessorFn: (row) => {
                    return <img src={row?.profileId} alt='image' width={"40px"} height={"40px"} />
                },

                size: 100
            },

            {
                accessorKey: 'createdAt',
                header: 'Created At',
                accessorFn: (row) => {
                    return new Date(row.createdAt).toLocaleDateString()
                },

                size: 150
            },
            {
                accessorKey: 'updatedAt',
                header: 'Updated At',
                accessorFn: (row) => {
                    return new Date(row.updatedAt).toLocaleDateString()
                },

                size: 150
            },
            {
                accessorKey: 'active',
                header: 'Active',
                accessorFn: (row) => {
                    return row?.active == true ? <button type="button" class="btn btn-danger">TRUE</button>
                        : <button type="button" class="btn btn-secondary">FALSE</button>

                },

                size: 150
            },
        ],

    );

    return (
        <Fragment>
            <div className="layout-wrapper">
                <Sidebar />
                <div className="page-content">
                    <Header />
                    <div className='px-3'>
                        {/* Start Content*/}
                        <div className="container-fluid">

                            {/* start page title */}
                            <div className="py-3 py-lg-4">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h4 className="page-title mb-0"> Doctors</h4>
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

                        <Footer />
                    </div>
                </div>
            </div>


        </Fragment>
    )
}

export default Doctors 