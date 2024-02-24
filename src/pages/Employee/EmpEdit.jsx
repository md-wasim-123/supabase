import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'




const EmpEdit = ({ show, oneValueId, toggelshow, fetchData }) => {
   
    if (!show) return null

    const [update, setUpdate] = useState({
        id: '',
        Name: '',
        Email: '',
        Address: '',
        joining: '',
        worked: '',
        Leader: '',
    })
    const [loading, setloading] = useState(false)
    const [write, setWrite] = useState(false)

    useEffect(() => {
        setUpdate(oneValueId)
    }, [oneValueId])


    const handleUpdate = async () => {
        try {
            setloading(true)
            const { data, error } = await supabase.from('Emp').update({
                Name: update?.Name,
                Email: update?.Email,
                Address: update?.Address,
                joining: update?.joining,
                worked: update?.worked,
                Leader: update?.Leader
            }).eq('id', update?.id).select()

            if (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
        fetchData()
        setloading(false)
    }

    const change = () => {
        toggelshow()
    }
    const removebtn = () => {
        setTimeout(() => {
            toggelshow()
        }, 1000);

    }

    const handleChange = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value })
        setWrite(true)
    }
    return (
        <section className="h-screen w-screen mx-auto fixed top-0 md:py-10 z-30 backdrop-blur-sm bg-white/25">
            <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">

                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className='flex items-center justify-between'>
                            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl dark:text-white">
                                Edit
                            </h1>
                            <p className='text-violet-700'>Chenges Your Data</p>
                            <i onClick={change} className="fa-solid fa-xmark text-2xl text-white cursor-pointer"></i>
                        </div>
                        <form className="container flex flex-col mx-auto space-y-12">
                            <fieldset className=" p-3 rounded-md shadow-sm  w-full">
                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 text-white" >
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="text-sm">Employee Name</label>
                                        <input type="text" placeholder="Enter Name" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" name='Name' value={update?.Name} onChange={handleChange} />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="email" className="text-sm">Email</label>
                                        <input id="lastname" type="email" placeholder="Project Name" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" name='Email' value={update?.Email} onChange={handleChange} />
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="address" className="text-sm">Address</label>
                                        <input id="address" type="text" placeholder="Address" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" name='Address' value={update?.Address} onChange={handleChange} />
                                    </div>
                                    <div className="col-span-full sm:col-span-2">
                                        <label htmlFor="date" className="text-sm">joining Date</label>
                                        <input id="city" type="date" placeholder="" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" name='joining' value={update?.joining} onChange={handleChange} />
                                    </div>
                                    <div className="col-span-full sm:col-span-2">
                                        <label htmlFor="worked" className="text-sm">Projects Worked On</label>
                                        <input id="state" type="text" placeholder="projects Worked On" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" name='worked' value={update?.worked} onChange={handleChange} />
                                    </div>
                                    <div className="col-span-full sm:col-span-2">
                                        <label htmlFor="state" className="text-sm">Leader</label>
                                        <input type="text" placeholder="Enter your Leader" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" name='Leader' value={update?.Leader} onChange={handleChange} />
                                    </div>
                                </div>
                            </fieldset>
                            <button onClick={() => { handleUpdate(); removebtn(); }} type="button" disabled={!write} className={`px-8 py-3 font-semibold rounded-full ${write ? "dark:bg-violet-700" : "bg-slate-400"}  text-gray-800 `}>
                                {loading ?
                                    (<div className="w-6 h-6 flex items-center justify-center mx-auto border-2 border-dashed rounded-full animate-spin border-black"></div>
                                    )
                                    : (<p>Add Details</p>)}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default EmpEdit
