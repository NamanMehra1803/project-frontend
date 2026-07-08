import React, { useEffect, useState, useMemo } from 'react'
import { Fragment } from 'react'
import Header from '../Utills/Header'
import Footer from '../Utills/Footer'
import Sidebar from '../Utills/Sidebar'
import Axios from '../../Confing/axios'
import Table from '../../Table/Table'
import { toast } from 'react-toastify'

function DeleteRequest() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [serach , setSerach] = useState('')
  

    const handlePagination = (pagination) => {
        setIsLoading(true)
        Axios.get(`admin/get-delete-account-request-list?page=${pagination?.pageIndex + 1}&limit=${pagination?.pageSize}&searchTerm=${serach}`).then((res) => {
            if (res.data.status) {
                setData(res?.data?.data)
                setIsLoading(false)
                // setPagination(res.data.totalItems)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
  
    useEffect(()=>{
     if(serach.length >= 0){
        handlePagination()
     }
    },[serach])
    const handledelete =(id)=>{
        const data ={
            user_id:id
        }
        Axios.post("auth/delete-account",data).then((res)=>{
            if(res.data.data.status){
                toast.success(res.data.data.message)
                setIsLoading(false)
                setSerach('')
             }
        }).catch((err)=>{
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
                size:200
            },
            {
                accessorKey: 'name',
                header: 'Name',
                enableEditing: false,
                size: 200,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                enableEditing: false,
                size: 200,
            },
            {
                accessorKey: 'reason',
                header: 'Reason',
                size:200

              },
              
         
            {
                accessorKey: 'createdAt',
                header: 'Created At',
                accessorFn: (row) => {
                    return new Date(row?.createdAt).toLocaleDateString()
                },
                size:200

            },
            {
                accessorKey: 'updatedAt',
                header: 'Updated At',
                accessorFn: (row) => {
                    return new Date(row?.updatedAt).toLocaleDateString()
                },
                size:200

            },
            {
                accessorKey: 'status',
                header: 'status',
                accessorFn: (row) => {
                    return row?.status =="1" ? <button type="button" class="btn btn-success">Approved</button> : <button type="button" class="btn btn-danger" onClick={()=>handledelete(row.id)} >Accept</button>
                },
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
                                        <h4 className="page-title mb-0">Delete Account Request</h4>
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

export default DeleteRequest