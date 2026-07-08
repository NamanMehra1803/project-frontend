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


function Settings() {
    const [data , setData] = useState({})
    const SettingSchema = yup.object().shape({
        averageMile: yup
            .string()
            .required("Average Mile Version is required")
            .max(100, "Name must be at most 100 characters long"),
        averageRating: yup
            .string()
            .required("AverageRating  is required"),
            maxMiles: yup
            .string()
            .required("MaxMiles  is required"),
    });
    const { register, setValue, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(SettingSchema)
    });
    const handlesubmit = (send) => {
        const senddata ={
            id:data.id,
            averageMile : send.averageMile, 
            averageRating  :send.averageRating,
            maxMiles :send.maxMiles
        }
            Axios.post("admin/update-settings",senddata).then((res)=>{
            if(res.data.status){
                toast.success(res.data.message)
            }
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }

  
    useEffect(()=>{
        Axios.get("admin/get-settings").then((res)=>{
            if(res.data.status){
                setData(res?.data?.data?.rows[0])
                setValue('averageMile',res?.data?.data?.rows[0]?.averageMile)
                setValue('averageRating',res?.data?.data?.rows[0]?.averageRating)
                setValue('maxMiles',res?.data?.data?.rows[0]?.maxMiles)
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
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Average Mile</label>
                                            <input type="text" className="form-control"
                                                id="exampleI"
                                                name='averageMile'
                                                placeholder="Average Mile"
                                                {...register("averageMile")}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="averageMile"
                                                render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Average Rating</label>
                                            <input type="text" className="form-control" id="exampleInmail1" 
                                                name='averageRating' {...register("averageRating")} placeholder="Average Rating" />
                                            <ErrorMessage
                                                errors={errors}
                                                name="averageRating"
                                                render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Max Miles</label>
                                            <input type="text" className="form-control"
                                             id="exampleInputPassword1" name='maxMiles' placeholder="Max Miles" {...register("maxMiles")} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="maxMiles"
                                                render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                            />
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

export default Settings