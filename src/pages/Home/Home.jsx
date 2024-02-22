import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="bg-gray-800 h-auto md:h-screen text-gray-100 border-b ">
    <div className=" flex flex-col items-center justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
        <h1 className="text-5xl font-bold leadi sm:text-6xl">The <span className="dark:text-violet-400">Ser</span>vice Provider
        </h1>
        <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
          <br className="hidden md:inline lg:hidden"/>turpis pulvinar, est scelerisque ligula sem
        </p>
        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
          <Link to={'/signup'} className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Click</Link>
          <Link to={'/'} className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100">More &rarr;</Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-end p-6 mt-8 lg:mt-0 ">
        <img src="https://source.unsplash.com/random/1920x1080/?employee" alt="" className="object-contain rounded-lg shadow-2xl" />
      </div>
    </div>
  </section>
  )
}

export default Home
