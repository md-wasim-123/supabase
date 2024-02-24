import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <section className=" bg-gray-800 h-auto md:h-screen text-gray-100 border-b ">
      <div className="container mx-auto flex flex-col items-center justify-center p-6 sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold leadi sm:text-6xl">The <span className="dark:text-violet-400">Ser</span>vice Provider
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
            <br className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
          </p>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-end p-6 mt-8 lg:mt-0 ">
          <img src="https://source.unsplash.com/random/1920x1080/?employee" alt="" className="object-contain rounded-lg shadow-2xl" />
        </div>
      </div>
    </section>

  )
}



export default Home
