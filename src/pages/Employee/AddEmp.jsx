import React, { useRef, useState } from 'react'
import { supabase } from '../../supabaseClient';
import { Link, useParams } from 'react-router-dom';
const AddEmp = ({ showMsg }) => {
    const [loading, setloading] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [Salary, setSalary] = useState("");
    const [Address, setAddress] = useState("");
    const [Date, setDate] = useState("");
    const [worked, setWorked] = useState("");
    const [Leader, setLeader] = useState("");
    const param = useParams()
    const refName = useRef(null)
    const refEmail = useRef(null)
    const refSalary = useRef(null)
    const refAddress = useRef(null)
    const refDate = useRef(null)
    const refWorke = useRef(null)
    const refLeader = useRef(null)


    const handleAdd = async (e) => {
        e.preventDefault()
        if (name == "" || email == "" || Salary == "" || Address == "" || Date == "" || worked == "" || Leader == "") {
            showMsg("Plese All fill Requier")
            setloading(false)
        }
        else {
            try {
                setloading(true)
                const { data, error } = await supabase.from('Emp').insert([
                    {
                        Client: param.id,
                        Salary: Salary,
                        Address: Address,
                        Name: name,
                        Leader: Leader,
                        joining: Date,
                        worked: worked,
                        Email: email
                    },
                ]).select()
                if (error) {
                    showMsg("Server is error", error)
                }
                else {
                    showMsg("successfully Add the value")
                }
                refName.current.value = "";
                refEmail.current.value = "";
                refSalary.current.value = "";
                refAddress.current.value = "";
                refDate.current.value = "";
                refWorke.current.value = "";
                refLeader.current.value = "";
            } catch (error) {
                console.log(error)
            }
            setTimeout(() => {
                setloading(false)
            }, 100);
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
                        <div className="col-span-full sm:col-span-1">
                            <label htmlFor="firstname" className="text-sm">Client Id</label>
                            <p className='bg-yellow-400 p-2 rounded-md text-black font-bold w-fit'>{param.id}</p>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="firstname" className="text-sm">Employee Name</label>
                            <input ref={refName} id="firstname" type="text" placeholder="Enter Name" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="email" className="text-sm">Email</label>
                            <input ref={refEmail} type="email" placeholder="Enter Email" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="address" className="text-sm">Enter Salary</label>
                            <input ref={refSalary} type="number" placeholder="Salary" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setSalary(e.target.value)} />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="city" className="text-sm">Enter Address</label>
                            <input ref={refAddress} type="text" placeholder="Address" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="date" className="text-sm">Joining Date</label>
                            <input ref={refDate} type="date" placeholder="" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="Worked" className="text-sm">Worked On</label>
                            <input ref={refWorke} type="text" placeholder="Enter Work on" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setWorked(e.target.value)} />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="leader" className="text-sm">Leader</label>
                            <input ref={refLeader} type="text" placeholder="Enter Work on" className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" onChange={(e) => setLeader(e.target.value)} />
                        </div>
                    </div>
                </fieldset>
                <button onClick={handleAdd} type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-violet-700 text-gray-800">{loading ?
                    (<div className="w-6 h-6 flex items-center justify-center mx-auto border-2 border-dashed rounded-full animate-spin border-black"></div>
                    )
                    : (<p>Add Details</p>)}</button>

                <Link to={`/employee/${param.id}`}>
                    <button type="button" className="px-5 w-28 py-3 font-semibold shadow-2xl rounded-full bg-violet-100 text-gray-800"> &larr; Back</button>
                </Link>
            </form>
        </section>
    )
}

export default AddEmp
