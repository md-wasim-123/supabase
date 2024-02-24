import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { Link, useNavigate } from 'react-router-dom'

const Signin = ({ showMsg }) => {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	const handSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		})
		if (error) {
			showMsg(error.error_description || error.message)
		}
		else if (data.session === null) {
			showMsg("Email and password dose not match please sign up account")
		}
		else {
			navigate('/')
		}
		 
		setLoading(false)
	}
	return (

		<div className='w-full h-auto md:min-h-screen max-w-md container mx-auto py-10'>
			<div className=" p-8  rounded-xl bg-gray-900 text-slate-300">
				<h1 className="text-2xl font-bold text-center">Sign in </h1>
				<form action="" className="space-y-6">
					<div className="space-y-1 text-sm">
						<label htmlFor="email" className="block dark:text-gray-400">Email</label>
						<input type="email" name="username" id="username" placeholder="Enter Your Email" className="w-full px-4 py-3 rounded-md border bg-gray-900 text-gray-100" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="space-y-1 text-sm">
						<label htmlFor="password" className="block dark:text-gray-400">Password</label>
						<input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border bg-gray-900 text-gray-100" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<button onClick={handSubmit} className="block w-full p-3 text-center rounded-sm dark:text-gray-900 dark:bg-violet-400">{loading ? <span><div className="w-6 h-6 mx-auto  border-2 border-dashed rounded-full animate-spin border-black"></div></span> : <span>Sign in</span>}</button>
				</form>
				<div className="flex items-center pt-4 space-x-1">
					<div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
					<p className="px-3 text-sm dark:text-gray-400">Sign in with social accounts</p>
					<div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
				</div>
				<p className="text-xs text-center sm:px-6 dark:text-gray-400 py-10">Don't have an account?
					<Link rel="noopener noreferrer" to={'/signup'} className="underline dark:text-gray-100">Sign up</Link>
				</p>
			</div>
		</div>


	)
}

export default Signin
