import React, { useRef, useState } from 'react'
import { supabase } from '../../supabaseClient';
const AddEmp = () => {
    const [loading, setloading] = useState(false)
    const [name, setName] = useState("");
    const [project, setProject] = useState("");
    const [address, setAddress] = useState("");
    const [startDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [select, setSelect] = useState("");
    const refName = useRef(null)
    const refProject = useRef(null)
    const refAddress = useRef(null)
    const refStart = useRef(null)
    const refEnd = useRef(null)
    const refSelect = useRef(null)


    const handleAdd = async (e) => {
        e.preventDefault()
        if (name == "" || project == "" || address == "" || startDate == "" || EndDate == "" || select == "") {
            alert("Enter All Feild Requier");
            setloading(false)
        }
        else {
            try {
                setloading(true)
                const { data, error } = await supabase.from('ClientInfo').insert([
                    {
                        Client_Name: name,
                        Project_Name: project,
                        Address: address,
                        Start_Date: startDate,
                        End_Date: EndDate,
                        Status: select
                    }])
                    .select()
                if (error) {
                    console.log("Error in server in add client details")
                }
                refName.current.value = "";
                refProject.current.value = "";
                refAddress.current.value = "";
                refStart.current.value = "";
                refEnd.current.value = "";
                refSelect.current.value = "";
            } catch (error) {
                console.log(error)
            }
            setloading(false)
        }
    }


    return (
        <section className="w-full h-full md:h-screen p-6 dark:bg-gray-800 dark:text-gray-50 pt-32">
            <form className="container flex flex-col mx-auto space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                    <div className="space-y-2 col-span-full lg:col-span-1 bg-slate-700 p-2 	bg-no-repeat bg-cover bg-center bg-[url('https://source.unsplash.com/random/1920x1080/?3d')]">
                        <p className="font-medium">Personal Inormation</p>
                        <p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="firstname" className="text-sm">Client Name</label>
                            <input ref={refName} id="firstname" type="text" placeholder="Enter Name" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="lastname" className="text-sm">Project Name</label>
                            <input ref={refProject} id="lastname" type="text" placeholder="Project Name" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setProject(e.target.value)} />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="address" className="text-sm">Client Address</label>
                            <input ref={refAddress} id="address" type="text" placeholder="Address" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="city" className="text-sm">Start Date</label>
                            <input ref={refStart} id="city" type="date" placeholder="" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="state" className="text-sm">End Date</label>
                            <input ref={refEnd} id="state" type="date" placeholder="" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="state" className="text-sm">Select</label>
                            <select ref={refSelect} className='w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900' onChange={(e) => setSelect(e.target.value)}>
                                <option >Select</option>
                                <option value="true">Completed</option>
                                <option value="false">UnCompleted</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <button onClick={handleAdd} type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-violet-700 text-gray-800">{loading ?
                    (<div className="w-6 h-6 flex items-center justify-center mx-auto border-2 border-dashed rounded-full animate-spin border-black"></div>
                    )
                    : (<p>Add Details</p>)}</button>
            </form>
        </section>
    )
}

export default AddEmp
