import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useParams, Link } from 'react-router-dom'
import DeleteEmp from '../../components/DeleteClient/DeleteClient'
import EmpEdit from './EmpEdit'

const Employee = ({showMsg}) => {
    const [empData, setEmpData] = useState([])
    const [loading, setloading] = useState(false)
    const [oneValueId, setoneValueId] = useState(null)
    const [show, setShow] = useState(false)
    const [Delete, setDelete] = useState(false)
    const [DeleteId, setDeleteId] = useState(null)
    const params = useParams();

    const feEmp = async () => {
        try {
            setloading(true)
            let { data, error } = await supabase.from('Emp').select('*').eq('Client', params.id);
            if (error) {
                showMsg(error.error_description || error.message)
            }
          
            setEmpData(data)
        } catch (error) {
            console.log(error)
        }
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }

    useEffect(() => {
        feEmp()
    }, [params.id])


    //to check id then stor in setoneValueId all data related id
    const handleEdit = async (id) => {
        empData.map((val) => {
            if (val.id === id) {
                setoneValueId({
                    id: val.id,
                    Name: val.Name,
                    Email: val.Email,
                    Address: val.Address,
                    joining: val.joining,
                    worked: val.worked,
                    Leader: val.Leader,
                })
            }
        })
    }

    const handleDelete = async (id) => {
        console.log(id)
        setEmpData((prev) => {
            return prev.filter((va) => va.id !== id)
        })
        const { error } = await supabase.from('Emp').delete().eq('id', id)
        if (error){
            showMsg(error.error_description || error.message)
        }
    }

    const toggelshow = () => {
        setShow(false)
    }

    return (
        <>
            <EmpEdit fetchData={feEmp} show={show} toggelshow={toggelshow} oneValueId={oneValueId} />
            <DeleteEmp confirmDelete={Delete} setDelete={setDelete} DeleteId={DeleteId} handleDelete={handleDelete} />
            <div className="container  p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leadi">Employee Details</h2>
                {loading ? (
                    <div className='w-full h-80 p-5 flex items-center justify-center'>
                        <div className="w-16 mx-auto h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
                    </div>
                ) : (
                    <>
                        <div className='flex items-center justify-end p-2 py-4 sticky top-0'>
                            <Link to={`/addemp/${params.id}`}>
                                <button  type="button" className="px-8 py-2  font-semibold rounded-full bg-violet-700 text-gray-200">Add</button>
                            </Link>
                        </div>
                        {empData.length === 0 ? (
                            <div className='text-5xl text-slate-100 text-center h-screen font-bold'>
                                <p>Are not any Employee Data ! </p>

                            </div>
                        )
                            : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full  text-nowrap">
                                        <thead className="dark:bg-gray-700 text-md">
                                            <tr className="text-left">
                                                <th className="p-3">Client Id</th>
                                                <th className="p-3">Employee Name</th>
                                                <th className="p-3">Email</th>
                                                <th className="p-3">Salary</th>
                                                <th className="p-3 text-right">Address</th>
                                                <th className="p-3 text-right">Joining Date</th>
                                                <th className="text-center ps-16">Worked On</th>
                                                <th className="p-3 text-right">Leader</th>
                                                <th className="p-3 text-right">Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-sm'>
                                            {empData?.map((item) => (
                                                <tr key={item.id} className="border-b border-opacity-20 border-gray-700 bg-gray-900">
                                                    <td className="p-3">
                                                        <p className='bg-yellow-400 p-2 rounded-md text-black font-bold w-fit'>{item.Client}</p>
                                                    </td>
                                                    <td className="p-3">
                                                        <p>{item.Name}</p>
                                                    </td>
                                                    <td className="p-3">
                                                        <p>{item.Email}</p>
                                                    </td>
                                                    <td className="p-3">
                                                        <p>{item.Salary}</p>
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <p>{item.Address}</p>
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <p>{item.joining}</p>
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <p>{item.worked}</p>
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <p>{item.Leader}</p>
                                                    </td>
                                                    <td className="p-3 text-right flex items-center justify-end gap-5">
                                                        <button onClick={() => { handleEdit(item.id), setShow(true) }} className='p-2 border hover:bg-green-400 hover:text-black border-y-slate-100'>
                                                            <i className="fa-solid fa-pen text-md"></i>
                                                        </button>
                                                        <button onClick={() => { setDeleteId(item.id), setDelete(true) }} className='p-2 border hover:bg-red-600 border-y-slate-100'>
                                                            <i className="fa-solid fa-trash text-md"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                    </>
                )}
                <div className='flex items-center justify-start p-2 py-4'>
                    <Link to={'/client'}>
                        <button type="button" className="px-8 py-2  font-semibold rounded-full bg-violet-100 text-gray-900">&larr;  Back</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Employee
