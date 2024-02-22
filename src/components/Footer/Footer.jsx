import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 dark:text-gray-50">
	<div className="container flex flex-col p-4 items-center justify-center mx-auto md:p-8 md:flex-row dark:divide-gray-400">
		<ul className=" py-6  text-center flex sm:space-y-0 justify-center sm:space-x-4 lg:flex-1 ">
			<li className='hover:border-b-2 p-1 border-b-violet-400 rounded-md'>Home</li>
			<li className='hover:border-b-2 p-1 border-b-violet-400 rounded-md'>Service</li>
		</ul>
	</div>
</footer>
  )
}

export default Footer
