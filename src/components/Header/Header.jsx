import React from 'react'
import logo from '../../assets/logo.png'
import { Link ,useNavigate} from 'react-router-dom'
import { supabase } from '../../supabaseClient'
const Header = ({ session }) => {
	const navigate=useNavigate()

	const handleLogout=()=>{
		supabase?.auth?.signOut()
		navigate('/')
	}
	return (
		<header className="p-4 dark:bg-gray-700 dark:text-gray-100 shadow-2xl">
			<div className="container flex justify-between items-center h-16 mx-auto">
				<Link to={'/'} aria-label="Back to homepage" className="flex items-center p-2">
					<img className='w-16' src={logo} alt="" />
				</Link>
				<div className="items-center flex-shrink-0 lg:flex">
					 
					{session ? (
						<div className='flex items-center justify-center gap-5'>
							<Link to={'/emp'}>Service</Link>
							<h3 className='px-3 cursor-pointer  text-red-500 font-semibold text-lg border border-violet-700 p-2' onClick={handleLogout}>Log out</h3>
						</div>
					) : (
						 <Link to={'/signin'}>
								<button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Sign In</button>
							</Link>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
