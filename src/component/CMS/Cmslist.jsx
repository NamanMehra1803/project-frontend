import React, { useEffect, useState, useMemo } from 'react'
import { Fragment } from 'react'
import Header from '../Utills/Header'
import Footer from '../Utills/Footer'
import Sidebar from '../Utills/Sidebar'
import Axios from '../../Confing/axios'
import Table from '../../Table/Table'
import { toast } from 'react-toastify'
import secureLocalStorage from 'react-secure-storage'
import { Link, useNavigate } from 'react-router-dom'

function Cmslist() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [serach , setSerach] = useState('')
    const navigate = useNavigate()
  

    const handlePagination = (pagination) => {
        setIsLoading(true)
        Axios.get(`admin/get-cms-page?page=${pagination?.pageIndex + 1}&limit=${pagination?.pageSize}&searchTerm=${serach}`).then((res) => {
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
    const NavigateEdit =(id)=>{
        secureLocalStorage.setItem('CMSPAGE', id)
        navigate('/cms-save')
    }
    const handleDelete =(id)=>{
const data ={
    id:id
}
Axios.post('admin/delete-cms-page',data).then((res)=>{
    if(res.data.status){
        toast.success(res.data.message)
        handlePagination()

    }else{
        alert(res.data.message)
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
                accessorKey: 'title',
                header: 'Title',
                enableEditing: false,
                size: 200,
            },
        
            {
                accessorKey: 'createdAt',
                header: 'Created At',
                accessorFn: (row) => {
                    return new Date(row.createdAt).toLocaleDateString()
                },
                size: 200,

            },
            {
                accessorKey: 'updatedAt',
                header: 'Updated At',
                accessorFn: (row) => {
                    return new Date(row.updatedAt).toLocaleDateString()
                },
                size: 200,

            },
            {
                accessorKey: 'Action',
                header: 'Action',
                accessorFn :(row)=>{
                    return (
                        <div>
                            <button className="btn btn-primary me-md-2 " onClick={()=>NavigateEdit(row)} >Edit</button>
                            <button className="btn btn-danger" onClick={()=>handleDelete(row.id)} >Delete</button>

                        </div>
                    ) 
                },
                size: 200,

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
                                <h4 className="page-title mb-0"> CMS PAGE</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between">
                                {/* <h4 className="page-title mb-0"> Comfortable Withs</h4> */}
                                <div className='col-md-4'> <input text="search" className="form-control" placeholder='search ' onChange={(e) => setSerach(e.target.value)} /></div>
                    <div className='col-md-4 text-md-end'>  <Link to={'/cms-save'} className='btn btn-primary' >Create New</Link> </div>
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

export default Cmslist