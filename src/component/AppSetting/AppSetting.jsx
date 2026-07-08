import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from '../Utills/Sidebar'
import Header from '../Utills/Header'
import Footer from '../Utills/Footer'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from 'yup';
import Axios from '../../Confing/axios'
import { toast } from 'react-toastify'

function AppSetting() {
    const [data , setData] = useState({})
    const appSettingSchema = yup.object().shape({
        androidVersion: yup
            .string()
            .required("Android Version is required")
            .max(100, "Name must be at most 100 characters long"),
        iosversion: yup
            .string()
            .required("Ios Version is required"),
        androidUpdate: yup
            .string()
            .required("Android Update is required")
            .max(100, "Name must be at most 100 characters long"),

        iosupdate: yup
            .string()
            .required("Ios update is required"),
        androidMaintenance: yup
            .string()
            .required("Android Maintenance is required")
            .max(100, "Name must be at most 100 characters long"),

        iosMaintenance: yup
            .string()
            .required("Ios Maintenance is required"),
        androidlink: yup
            .string()
            .required("Android Link is required")
            .max(100, "Name must be at most 100 characters long"),

        ioslink: yup
            .string()
            .required("Ios link is required"),
        updatemessage: yup
            .string()
            .required("Update Message is required"),
    });
    const { register, setValue, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(appSettingSchema)
    });
    const handlesubmit = (send) => {
        const senddata ={
            id:data.id,
            androidVersion : send.androidVersion, 
            iosVersion : send.iosversion,
            iosAppLink  :send.ioslink,
            androidAppLink : send.androidlink, 
            androidMaintenance : send.androidMaintenance,
            androidForceUpdate : send.androidUpdate, 
            iosMaintenance :send.iosMaintenance , 
            iosForceUpdate  :send.iosupdate , 
            updateMessage :send.updatemessage
        }
            Axios.post("admin/get-app-setting-update",senddata).then((res)=>{
            if(res.data.status){
                toast.success(res.data.message)
            }
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }

  
    useEffect(()=>{
        Axios.get("admin/get-app-setting").then((res)=>{
            if(res.data.status){
                setData(res.data.data)
                setValue('androidVersion',res?.data?.data?.androidVersion)
                setValue('iosversion',res?.data?.data?.iosVersion)
                setValue('androidUpdate',res?.data?.data?.androidForceUpdate)
                setValue('iosUpdate',res?.data?.data?.iosForceUpdate)
                setValue('androidMaintenance',res?.data?.data?.androidMaintenance)
                setValue('iosMaintenance',res?.data?.data?.iosMaintenance)
                setValue('androidlink',res?.data?.data?.androidAppLink)
                setValue('ioslink',res?.data?.data?.iosAppLink)
                setValue('updatemessage',res?.data?.data?.updateMessage)
            }
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    },[])
  
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
                                        <h4 className="page-title mb-0">App Setting</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='row'>
                                    <form className="common-form-area-left-inner-form" onSubmit={handleSubmit(handlesubmit)} >
                                        <div className='row gy-4'>
                                        <div className="col-12">
                                            <label htmlFor="exampleInputEmail1">Android Version</label>
                                            <input type="text" className="form-control"
                                                id="exampleInptEmail1"
                                                name='androidVersion'
                                                placeholder="Android Version"
                                                {...register("androidVersion")}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="androidVersion"
                                                render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="exampleInputPassword1">Ios Version</label>
                                            <input type="text" className="form-control" id="exampleInutPassword1" name='iosversion' placeholder="Ios Version" 
                                            {...register("iosversion")} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="iosversion"
                                                render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-md-3 form-check">
                                            <input type="checkbox" 
                                             name='androidUpdate'
                                             class="form-check-input"
                                             defaultChecked={data?.androidForceUpdate?.toString() == "true" ? true : false}
                                            {...register("androidUpdate")}  />
                                             <label className='form-check-label'>Android Force Update</label>
                                           
                                        </div>
                                        <div className="col-md-3 form-check">
                                           
                                            <input type="checkbox"  name='iosupdate' 
                                             class="form-check-input" 
                                             defaultChecked={data?.iosForceUpdate?.toString() == "true" ? true : false}

                                             {...register("iosupdate")} />
                                              <label className="form-check-label">Ios Force Update</label>
                                           
                                        </div>
                                        <div className="col-md-3 form-check">
                                           
                                            <input type="checkbox"  name='androidMaintenance' class="form-check-input" 
                                             defaultChecked={data?.androidMaintenance?.toString() == "true" ? true : false}
                                             {...register("androidMaintenance")}  />
                                              <label className="form-check-label">Android Maintenance</label>

                                        </div>
                                        <div className="col-md-3 form-check ">
                                            <input type="checkbox"  name='iosMaintenance' className='form-check-input'
                                             defaultChecked={data?.iosMaintenance?.toString() == "true" ? true : false}

                                             {...register("iosMaintenance")}  />
                                            <label className="form-check-label">Ios Maintenance</label>
            
                                           
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="exampleInputEmail1">Android App Link</label>
                                            <input type="text" className="form-control" id="exampleInmail1" 
                                                name='androidlink' {...register("androidlink")} placeholder="Android App Link" />
                                            <ErrorMessage
                                                errors={errors}
                                                name="androidlink"
                                                render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="exampleInputPassword1">Ios App Link</label>
                                            <input type="text" className="form-control"
                                             id="exampleInputPassword1" name='ioslink' placeholder="Ios App Link" {...register("ioslink")} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="ioslink"
                                                render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="exampleInputPassword1">Update Message</label>
                                            <input type="text" className="form-control" 
                                            id="exampleInputPassword1" name='updatemessage' {...register("updatemessage")} placeholder="Update Message" />
                                            <ErrorMessage
                                                errors={errors}
                                                name="updatemessage"
                                                render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        </div>
                                        
                                        
                                      
                                        
                                        

                                        <button type="submit" className="btn btn-primary mt-5">Submit</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>


        </Fragment>
    )
}

export default AppSetting