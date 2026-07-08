import React, { useEffect, useState, useMemo } from 'react'
import { Fragment } from 'react'
import Header from '../Utills/Header'
import Footer from '../Utills/Footer'
import Sidebar from '../Utills/Sidebar'
import Axios from '../../Confing/axios'
import Table from '../../Table/Table'
import { toast } from 'react-toastify'
import { Modal } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from 'yup';
function Blog() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [serach, setSerach] = useState('')
    const [open, setOpen] = useState(false)
    const [blogdata, setBlogdata] = useState({})

    const blogsSchema = yup.object().shape({
        title: yup
            .string()
            .required("Title is required")
            .max(100, "Title must be at most 100 characters long"),

        Image: yup
            .mixed()
            .required("Image is required"),
        description: yup
            .string()
            .required("Description is required")
            .max(100, "Description must be at most 100 characters long"),
    });

    const { register, setValue, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(blogsSchema)
    });
    const handlePagination = (pagination) => {
        setIsLoading(true)
        Axios.get(`admin/get-all-blogs?page=${pagination?.pageIndex + 1}&limit=${pagination?.pageSize}&searchTerm=${serach}`).then((res) => {
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
    const handleOpen = (id) => {
        console.log(id)
        setOpen(true)
        setBlogdata(id)
    }

    const handledelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            const data = {
                id: id
            }
            Axios.post('admin/delete-blogs', data).then((res) => {
                if (res.data.status) {
                    toast.success(res.data.message)
                    setOpen(false)
                    handlePagination()
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'S.NO',
                header: 'S.NO',
                accessorFn: (row, index) => {
                    return index + 1;
                },
                size: 190,

            },
            {
                accessorKey: 'title',
                header: 'Title',
                enableEditing: false,
                size: 190,
            },
            {
                accessorKey: 'author',
                header: 'Author',
                accessorFn: (row) => {
                    return row?.author == null ? "No Name" : row?.author
                },
                size: 190,


            },

            {
                accessorKey: 'images',
                header: 'Image',
                accessorFn: (row) => {
                    return <img src={row?.images[0]} alt='image' width={"50px"} height={"50px"} />
                },
                size: 190,

            },
            // {
            //     accessorKey: 'description',
            //     header: 'Description',
            // },


            {
                accessorKey: 'createdAt',
                header: 'Created At',
                accessorFn: (row) => {
                    return new Date(row.createdAt).toLocaleDateString()
                },
                size: 190,

            },
            {
                accessorKey: 'updatedAt',
                header: 'Updated At',
                accessorFn: (row) => {
                    return new Date(row.updatedAt).toLocaleDateString()
                },
                size: 190,

            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                accessorFn: (row, index) => {
                    return (
                        <div>
                            <button className="btn btn-primary" onClick={() => handleOpen(row)}  >Edit</button>
                            <button className="btn btn-danger" onClick={() => handledelete(row.id)} >Delete</button>
                        </div>
                    );
                },
                size: 190,

            },
        ],

    );

    const handleImage = (e) => {
        setValue("Image", e)
    }
    const handlesubmit = (send) => {
        if (Object.keys(blogdata).length == 0) {
            const formData = new FormData();
            formData.append('title', send.title)
            formData.append('file', send.Image)
            formData.append('description', send.description)
            Axios.post('admin/create-blogs', formData).then((res) => {
                if (res.data.status) {
                    toast.success(res.data.message)
                    setBlogdata({})
                    setOpen(false)
                    handlePagination()

                }
            }).catch((err) => {
                console.log(err)
            })
        } else {
            const formData = new FormData();
            formData.append('title', send.title)
            formData.append('file', send.Image)
            formData.append('description', send.description)
            formData.append('id', blogdata.id)
            Axios.post('admin/update-blogs', formData).then((res) => {
                if (res.data.status) {
                    toast.success(res.data.message)
                    setBlogdata({})
                    setOpen(false)
                    handlePagination()
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    const handleclso = () => {
        setOpen(false)
        setBlogdata({})
    }
    const handlecancle = () => {
        setBlogdata({ ...blogdata, images: [''] });
        setValue('Image')
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
                                        <h4 className="page-title mb-0">Blogs</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                {/* <h4 className="page-title mb-0"> Comfortable Withs</h4> */}
                                <div className='col-md-4'> <input text="search" className="form-control" placeholder='search ' onChange={(e) => setSerach(e.target.value)} /></div>
                                <div className='col-md-4 text-md-end'> <a className='btn btn-primary' onClick={() => setOpen(true)}>Create New Blog</a></div>

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

            <Modal show={open} onHide={handleclso}>
                <div>
                <Modal.Header closeButton>
                  <Modal.Title>Blogs</Modal.Title>
                    </Modal.Header>
                    <div className="modal-body customMODEL pb-0">
                        {/* <h2>Blogs</h2> */}
                        {/* <button className="btn btn-secondary" onClick={() => handleclso()}>Close</button> */}
                        <form className="common-form-area-left-inner-form" onSubmit={handleSubmit(handlesubmit)} >
                            <div className="form-row">
                                <div className="mb-4">
                                    <label className="form-label text-dark">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control"
                                        defaultValue={blogdata.title || ''}
                                        {...register("title")}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="title"
                                        render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label text-dark">Description</label>
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        defaultValue={blogdata.description || ''}
                                        {...register("description")}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="description"
                                        render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label text-dark">Image</label>
                                    {blogdata?.images?.[0] ?
                                        <div>
                                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAbFBMVEX///8AAADm5ubp6en8/PzDw8P19fWwsLC/v78UFBTs7Ozv7+93d3cqKirHx8dQUFBISEhubm7V1dVlZWWnp6cyMjIPDw+MjIzNzc0aGhrd3d1fX1+VlZVVVVV+fn63t7dBQUGfn58iIiI5OTmr/ggnAAAI9ElEQVR4nL1cWYKqMBBERFRERB0REVTw/nd84vLsJR2SANbfjBCaSu8J8TxnhEUyj9NswpGl8TwpQvehXVHU22qpEOiLZbWtix9K5M9irTwQ8cz/iUyL+G4sU4t7vBhZomB3tJLog+MuGE+opEOVZCyrZByRonnjKNILzTwaXKZgfuslU4vbfNh5DK79ePqguQ4oV1ENIlOLaigXtroMJlOLy2oIoRYH/VOyU3NP95djWZfHyz69NydVEAI49PdfkdaNV5f6WlDTioprfdHOedzTGnPR8rJ1nPhyAA79JF6LpN3yHjIFpTTsud4Z3L+rz9IApbMxrrbqEe9HDUkYoX8UoubWUekL9Xjbq+U4V/XL3Z18RHJSDJXFDnE22MUqDTs5hMar6v1iVy3NlaZsy7r3pxik6mM5ucpX/NmNUSsmr+4h03NMxTRajakQytVmAFQ2bSEWnz4XzVRAYUHGkzhnt+6HKgn8PRt7bnbnjN3o7ogZFOFiZnLfjs1eH9PjyNksGgSvKU1c1kOXmsWaPOEw7bolpG7lNkiShrCiiUjVFVZpvXceXqiHWDSVOOqvp+a3Hae6DKjn0hpiRKrQ81h9lZCwtdRkp1SpNuPV4cHGWLWIT1932kYPTIklij7eJ0INX4FDREQsKXwQFRzWeXLk+HFb9VXE/gzjUw8YPRBHgv3oQnkeDtUn1SXYf6a/6LWGKXqmwpeS6GRS7vUHzgQUERe3OPpmw6ao0VMv9OcIS/2rXnmIZ4j6IlwZje0UvsDuIcY/Yq2KxUizOm73F7uEq7jst0cx8wgQHUSzkAGexCz9fZlF0P6EYTFX8ZFDQpcFE/EniP85994061r9d0mldAn2SHCWUFheS49MvtfczNiCWadUu62Q8oAgHSAnK3oFGCfPJqE7glmUEOeId9h/yUKG0Ig0IKoN8nmSn0uXhahr/jV/NLVyDo2e0c1WRPJN8ULh8ehmuUwm6XOqZ2uFg9xkKV6J87rPf1E0kn0Vq38qXa5KmdLMAfZZnwiMQqCmGe7TZRMNW5SpSaNpVSzghe9guIKJfaMrIFgHQmRrynpoum5CAF9383pVNIEsbCPMaWNMYIsx1ZHZotl6TSFyoR1xeTEhULLFmepYJEGu6eVI4RCdXsiELcZU1lUDIM9WPf8F79dPYItutqyZ8sgUtv9A3sKgsGGdwBS7U1ud4oO21grVKjOplhlbG2j0/ob+bLLwNoWK0SoWJO9gMICCrc2XrYgJZVZXwl7eheQL3Wr1BPNb/9niTBl1PTE3j7xhCtXfdAlDYsuVKbxAc5t6BcxQjatAxlbasuUzRTdkCrvyU4EcmJywM3C2Vjh0WTFF0vccWVRl0QTlbO3cmXr4E+jkFl4N/rLqgjK22B4am64O6pTWKGkyNME3+BqGM1MeNsIj+kusjtTg6z2uTHmgqnuyA1NG256Hji07pnClc/bgkrd1e09mq9dQdw+mgbbvhwrXXkxh3hsP+wlrqNly6Kkiv+nBYO3S4Ev4anLmsvAKnXuGcj6ntiNny6n7jKqH3lz5fIfI3WU9GHMFPbKDXkWqbQqVw6oG1KslskF7ffDpuugLa3u2oDU3HhzWeocIz6fe2FizBROstQfHtdwg4vny5rqDLVuwfNh4OFZbYSox9RzZchmvBvduUc7QsfxLoGHKgS0sB4zVmi6RQigdU0+2bMRC3aISaZnNMjPb93Aq6faJ7n0KX6CF6CuySIthGFPZwlvQ4GPBFnrJxCvgUMarDoyprM0SZlQs89cs4FgF1llTN6piqoU7W2jKfDyhhkZI19cny08+NaMlhek6PzTBVr2hw0qNRmBMLb8NjgUVy5AtWLW16wXQNSxNXIPMVAs3tgJ4V1vUoO6fgWIVjCmcDjOxNgY2hDLtNnVB613disWsb0n7U2wSDSwRtfKfEwYnpNOPFrRsX3J6EypW2sUWMrk1l7Pj/m6mWlizBb3Ve77QnOqTGROmnkNasoWa668hfdhXu+lujphHl3qezJ0etGkgkuDtStCuHU1FQbdySUy1YGzpNBbVN5/VTbQ9W9MBoTWWyFQLxpamHkN7SD9pemhINamxNEy1oGzdxSuxYvznFC07yyUFEaqrj04tUbwQzdV3LxPq+MjvhIXqLh5zLJZ4HZqDb6CIUvX/NXd3MtUCsSW+LeIELr8gRypuRwTanpmV2TlQeUnb8cZLGPLwerREVvg/LmutD+JriRvpXXHDEOU9yGUdpHzms5y1Nm+T7N5RVlyiDpAB4q0YWGAx7IR/7UNKm01FReuM1n+iD8V7VMk04Y1/v/tOGcVltsURkyXuaRkceI8q02jch7LuzjgCf4tUsd/xCultxO+TAQK8v0dh2ZjLX2xipdqs0huyN3r8Db8sCVHWaOSblPH3sZKvWdQ5FMnJR9/zS/b7Srk9Wf44j6vxAclsxWyNfO5kt1xoC/IVtWxetKc4plhEKF2/km7rsG0qm4N+dqdNQugmubHEokLpOwkhLUPHEYsK1WXvbO+eXbfbDHRGdHv+XmDf7g6v8uwMA4NcgH3+OfAHaOzTMzMtYa+SDhl8+A4Rw8ngp0QMp/P8Q1xTDQn5J63bYYJiyL8t3huPrBDrPkR2euWrweZCqTTyQVffr4t9xUfYdpakoPqhXX2mMVR9mW+rGKHqkIDDzDW5CWaqxcTY/jWV5ySlTnIFM+YOWjiFDRXlrdrbOtWVQsmfCuEi1COvUW8LaEqbfQ85W8x8Ye18qoy0iJultdGpaWFRK89dm1gu/9Jh5UO4qnKmFyyclfJRN8d+XllpO2190aZkUUUj1PwijIilTzSlQB/vtWQTTjpPd1uf4WP9dk3xX7PLk+lcf47NaH/8jHuKL5cTsdLcs6zg16Y37QGeZReLBQA4oh/uKWhXCnNA7mGLMxHOQLHDureUMCU9v7LAf53C8xPygRY54pAP7HpiWyjDbibQc8/iCR6hN7BV/m4xxTAdBsIjNTxS8xYvftFgfmOaliWC3Mh935hQo6vh8Vx9Xubyf458eeYoQ+EW+eES+6tAss0m2bA7VIyou8sLvN23/AEbKbuuOwG1qAAAAAElFTkSuQmCC' width={"22px"} height={"22px"} onClick={() => handlecancle()} />
                                            <img src={blogdata?.images?.[0]} alt='image' width={"40px"} height={"40px"} /> </div> :
                                        <input
                                            type="file"
                                            id="file"
                                            name="Image"
                                            className="form-control"
                                            onChange={(e) => handleImage(e.target.files[0])}
                                        />
                                    }

                                    <ErrorMessage
                                        errors={errors}
                                        name="Image" // Fixed typo here
                                        render={({ message }) => <p className='error' style={{ color: 'red' }}>{message}</p>}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer px-0">

                                <button className="btn btn-success mx-0">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>


        </Fragment>
    )
}

export default Blog