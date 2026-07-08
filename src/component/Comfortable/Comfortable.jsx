import React, { Fragment, useEffect, useState , useMemo } from 'react'
import Sidebar from '../Utills/Sidebar'
import Header from '../Utills/Header'
import Footer from '../Utills/Footer'
import Axios from '../../Confing/axios'
import Table from '../../Table/Table'
import { toast } from 'react-toastify'
import { Modal } from 'react-bootstrap'

function Comfortable() {
const [data , setData] = useState([])
const [isLoading , setIsLoading] = useState(true)
const [open  , setOpen] = useState(false)
const [name , setName] = useState('')
const [id , setId] = useState('')
const [error , setError] = useState('')
const [serach , setSerach] = useState('')


const handlePagination = (pagination) => {
  Axios.get(`admin/get-comfortable-list?searchTerm=${serach}`).then((res)=>{
    if(res.status){
      setData(res.data.data)
      setIsLoading(false)
    }
  }).catch((err)=>{
    console.log(err)
  }) 
}
useEffect(()=>{
  if(serach.length > 0){
    handlePagination()
  }
},[serach])


const handleSearch = (value)=>{
  setData([])
  setIsLoading(true)
  Axios.get(`admin/get-comfortable-list?searchTerm=${value}`).then((res) => {
      if (res.data.status) {
          setData(res?.data?.data)
          setIsLoading(false)
      }
  }).catch((err) => {
      console.log(err)
  })
}
const viewAll =()=>{
  Axios.get("admin/get-comfortable-list").then((res)=>{
    if(res.status){
      setData(res.data.data)
      setIsLoading(false)
    }
  }).catch((err)=>{
    console.log(err)
  }) 
}
const handledelete = (id)=>{
if (window.confirm('Are you sure you want to delete this user?')) {
 const data ={
  id:id
 }
 Axios.post('admin/delete-comfortable-list',data).then((res)=>{
  console.log(res)
  if(res.data.status){
    toast.success(res.data.message)
    setTimeout(() => {
      viewAll()
    }, 1000);
  }
 }).catch((err)=>{
  console.log(err)
 })
}
}

const handleSave = ()=>{
  if(id){
    if(name == '' || name == undefined){
      setError("Please Enter Name")
    }
    else{
    const data ={
      id:id,
      name:name
    }
    Axios.post('admin/update-comfortable-list',data).then((res)=>{
      if(res.data.status){
        toast.success(res.data.message)
        setOpen(false)
        setTimeout(() => {
          viewAll()
        }, 1000);
      }
    }).catch((err)=>{
      console.log(err)
    })  
  }
  }else{
    if(name == '' || name == undefined){
      setError("Please Enter Name")
    }else{
    
    const data ={
      name:name
    }
    Axios.post('admin/create-comfortable-list',data).then((res)=>{
      if(res.data.status){
        toast.success(res.data.message)
        setOpen(false)
        setTimeout(() => {
          handlePagination()

        }, 1000);
      }
    }).catch((err)=>{
      console.log(err)
    })
      
  }
  }
  
 }

 const handlegetValue =(id , name)=>{
    setName(name)
    setId(id)
   setOpen(true)
 }
 const handleClsoe =()=>{
  setName("")
  setOpen(false)
  setError('')
  setId('')
 }
       
 const columns = useMemo(
  () => [
    {
      accessorKey: 'S.NO',
      header: 'S.NO',
      accessorFn: (row, index) => {
        return index + 1;
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      enableEditing: false,
      size:250,
      
       // Added size property with value 150
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      accessorFn: (row) => {
        return new Date(row.createdAt).toLocaleDateString()
      },
      size:250,
      
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At', // Changed to 'Updated At' to avoid duplication
      accessorFn: (row) => {
        return new Date(row.updatedAt).toLocaleDateString()
      },
      size:250,
      
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      accessorFn: (row, index) => {
        return (
          <div>
            <button className="btn btn-primary me-md-2" onClick={() => handlegetValue(row.id, row.name)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handledelete(row.id)}>Delete</button>
          </div>
        );
      },
      
    },
  ],
  []
);

  return (
    <Fragment>
    <div className="layout-wrapper">
     <Sidebar/>
      <div className="page-content">
       <Header/>
        <div className="px-3">
          {/* Start Content*/}
          <div className="container-fluid">
            {/* start page title */}
            <div className="py-3 py-lg-4">
              <div className="row">
                <div className="col-lg-6">
                  <h4 className="page-title mb-0"> Comfortable Withs</h4>
                </div>
              </div>
            </div>
           
            <div className="row justify-content-between">
            {/* <h4 className="page-title mb-0"> Comfortable Withs</h4> */}
            <div className='col-md-4'> <input text="search" className="form-control" placeholder='search ' onChange={(e)=>setSerach(e.target.value)} /></div>
            <div className='col-md-4 text-md-end'> <a className='btn btn-primary' onClick={()=>setOpen(true)}>Create New</a></div>
            <div class="input-group mb-3">
             
              
            </div>
           
            <div className='row'>
              <Table columns={columns} data={data} isLoading={isLoading} handlePagination={handlePagination}/>
            </div>
            </div> 
          </div> {/* container */}
        </div> 
      <Footer/>
      </div>
    </div>
    
    
 <Modal show={open} key={open} onHide={handleClsoe}>
  <div>
  <Modal.Header closeButton>
          <Modal.Title>New Comfortable</Modal.Title>
        </Modal.Header>
    <div className="modal-body customMODEL">
      {/* <h2></h2> */}
      <div className="form-row">
        <div className="mb-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            id="customerID"
            name="customerID"
            className="form-control"
            defaultValue={name || ''}
            required
            onChange={(e)=>setName(e.target.value)}
          />
          <span style={{color:"red"}} >{error}</span>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={()=>handleClsoe()}>Close</button>
        <button className="btn btn-success" onClick={() => handleSave()}>
          Save
        </button>
      </div>
    </div>
  </div>
</Modal>

  </Fragment>
  )
}

export default Comfortable