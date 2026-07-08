import React, { useState } from 'react'
import { Fragment } from 'react'
import Header from '../Utills/Header'
import Footer from '../Utills/Footer'
import Sidebar from '../Utills/Sidebar'
import Axios from '../../Confing/axios'
import { toast } from 'react-toastify'
import secureLocalStorage from 'react-secure-storage'
import { useNavigate } from 'react-router-dom'
import { CKEditor } from 'ckeditor4-react'


function CmsEdit() {
    const [data ,setData]=useState(secureLocalStorage.getItem('CMSPAGE'))
    const navigate = useNavigate()
    const handleInputValues = (e) => {
      const { name, value } = e.target; 
      setData(prevData => ({...prevData, [name]: value }));
  }
  
  const handleSave =()=>{
    if(data.id){
      const salg = data.name.split(' ')
      const salgresult = salg.map(item => item.toLowerCase()).join('-');
    const senddata ={
      name:data.name,
      title:data.title,
      description:data.description,
      id:data.id,
      slug:salgresult
    }
    Axios.post('admin/update-cms-page',senddata).then((res)=>{
      console.log(res)
      if(res.data.status){
        toast.success(res.data.message)
        secureLocalStorage.setItem("CMSPAGE",'')
        navigate('/cmslist')
      }
    }).catch((err)=>{
      console.log(err)
    })
  }else{
    const salg = data.name.split(' ')
    const salgresult = salg.map(item => item.toLowerCase()).join('-');
    const senddata ={
      name:data.name,
      title:data.title,
      description:data.description,
      slug:salgresult
    }
    Axios.post('admin/create-cms-page',senddata).then((res)=>{
      console.log(res)
      if(res.data.status){
        toast.success(res.data.message)
        secureLocalStorage.setItem("CMSPAGE",'')
        navigate('/cmslist')

      }
    }).catch((err)=>{
      console.log(err)
    })
  }
  }
 
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
                <h4 className="page-title mb-0">{data?.name} CMS PAGE</h4>
            </div>
        </div>
    </div>

    <div className="row">
        <div className="col-lg-6">
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text"name='name' className="form-control" value={data?.name || ''} onChange={handleInputValues} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" name='title' className="form-control" value={data?.title || ''} onChange={handleInputValues} required />
            </div>
            {/* <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" style={{ width: "100%" }}
                    value={data?.description || ''}
                    required
                    rows="8" // Specify the number of visible text lines
                    name='description'
                    onChange={handleInputValues}
                />
            </div> */}
            <div className="mb-3">
                <label className="form-label">Description</label>
                
              <CKEditor
                data="<p>Hello, CKEditor!</p>"
                onChange={(event) => console.log(event.editor.getData())}
                // config={ckeditorConfig}
              />
            </div>
        </div>
    </div>

    <div className="row">
        <div className="col-lg-6">
            <button className="btn btn-success" onClick={()=>handleSave()} >Save</button>
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

export default CmsEdit