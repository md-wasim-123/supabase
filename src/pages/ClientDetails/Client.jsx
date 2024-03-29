import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Link } from 'react-router-dom'
import EditEmp from './EditClient'
import DeleteEmp from '../../components/DeleteClient/DeleteClient'

const Client = ({ showMsg }) => {
  const [client, setClientInfo] = useState([])
  const [oneValueId, setoneValueId] = useState(null)
  const [show, setShow] = useState(false)
  const [Delete, setDelete] = useState(false)
  const [DeleteId, setDeleteId] = useState(null)
  const [loading, setloading] = useState(false)

  const Alldata = async () => {
    try {
      setloading(true)
      let { data, error } = await supabase.from("ClientInfo").select("*");
      if (error) {
        showMsg(error.error_description || error.message)
      }
      setClientInfo(data)
    } catch (error) {
      console.log(error);
    }
    setloading(false)
  };
  useEffect(() => {
    Alldata()

  }, [])

  //to check id then stor in setoneValueId all data related id
  const handleEdit = async (id) => {
    client.map((val) => {
      if (val.id === id) {
        setoneValueId({
          id: val.id,
          Name: val.Client_Name,
          Project: val.Project_Name,
          Address: val.Address,
          Start: val.Start_Date,
          End: val.End_Date,
          Sta: val.Status,
        })
      }
    })
  }
  
  const handleDelete = async (id) => {
    console.log(id)
    setClientInfo((prev) => {
      return prev.filter((va) => va.id !== id)
    })
    const { error } = await supabase.from('ClientInfo').delete().eq('id', id)
    if (error) throw error
    else{
      showMsg("Successfully Deleted ")
    }
  }

  const toggelshow = () => {
    setShow(false)
  }
  return (
    <>
      <EditEmp fetchData={Alldata} show={show} toggelshow={toggelshow} oneValueId={oneValueId} />
      <DeleteEmp confirmDelete={Delete} setDelete={setDelete} DeleteId={DeleteId} handleDelete={handleDelete} />
      <div className="container  p-2 mx-auto sm:p-4 dark:text-gray-100">
        <h2 className="mb-4 text-2xl font-semibold leadi">Client Details</h2>
        <div className='flex items-center justify-end p-2 py-4 sticky top-0'>
          <Link to={'/add'}>
            <button type="button" className="px-8 py-2  font-semibold rounded-full bg-violet-700 text-gray-200">Add</button>
          </Link>
        </div>
        {
          loading ? (
            <div className='w-full h-80 p-5 flex items-center justify-center'>
              <div className="w-16 mx-auto h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
            </div>
          ) : (
            client.length === 0 ? (
              <div className='text-center text-4xl text-slate-50 h-screen'>
                <h2>Add your Client Details</h2>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full  text-nowrap">
                  <thead className="dark:bg-gray-700 text-md">
                    <tr className="text-left">
                      <th className="p-3">Client Id</th>
                      <th className="p-3">Client Name</th>
                      <th className="p-3">Project Name</th>
                      <th className="p-3">Client Address</th>
                      <th className="p-3">Start Date</th>
                      <th className="p-3 text-right">End Date</th>
                      <th className="p-3 text-right">Status</th>
                      <th className="text-center ps-16">Edit</th>
                      <th className="p-3 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className='text-sm'>
                    {client.map((item) => (
                      <tr key={item.id} className="border-b border-opacity-20 border-gray-700 bg-gray-900">
                        <td className="p-3">
                          <p className='bg-yellow-400 p-2 rounded-md text-black font-bold w-fit'>{item.id}</p>
                        </td>
                        <td className="p-3">
                          <p>{item.Client_Name}</p>
                        </td>
                        <td className="p-3">
                          <p>{item.Project_Name}</p>
                        </td>
                        <td className="p-3">
                          <p>{item.Address}</p>
                        </td>
                        <td className="p-3">
                          <p>{item.Start_Date}</p>
                        </td>
                        <td className="p-3 text-right">
                          <p>{item.End_Date}</p>
                        </td>
                        <td className="p-3 text-right">
                          <span className={`px-2 py-1 font-semibold rounded-md ${item.Status ? "bg-teal-600 hover:bg-teal-300" : "bg-yellow-400  hover:bg-yellow-200"}  cursor-pointer text-gray-900`}>
                            <span>{item.Status ? "Completed" : "Uncompleted"}</span>
                          </span>
                        </td>
                        <td className="p-3 text-right flex items-center justify-end gap-5">
                          <button onClick={() => { handleEdit(item.id); setShow(true); }} className='p-2 border hover:bg-green-400 hover:text-black border-y-slate-100'>
                            <i className="fa-solid fa-pen text-md"></i>
                          </button>
                          <button onClick={() => { setDeleteId(item.id); setDelete(true); }} className='p-2 border hover:bg-red-600 border-y-slate-100'>
                            <i className="fa-solid fa-trash text-md"></i>
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <Link to={`/employee/${item.id}`}>
                            <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                              <span>Check</span>
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )
        }


        <div className='flex items-center justify-start p-2 py-4'>
          <Link to={"/"}>
            <button type="button" className="px-8 py-2  font-semibold rounded-full bg-violet-100 text-gray-900">&larr;  Back</button>
          </Link>
        </div>
      </div >
    </>
  )
}

export default Client
