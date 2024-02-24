import React from 'react'

const DeleteEmp = ({ confirmDelete, setDelete, handleDelete, DeleteId }) => {
    if (!confirmDelete) return null

    const ConfirmDeletedBtn = () => {
        handleDelete(DeleteId)
        setTimeout(() => {
            setDelete(false)
        }, 100);
    }
    const disDelete = () => {
        setDelete(false)
    }
    return (
        <section className="h-screen w-screen mx-auto fixed top-0 md:py-10 z-30 backdrop-blur-sm bg-white/25">
            <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0">
                    <i  onClick={disDelete} className="fa-solid fa-circle-xmark relative left-[220px] top-5 cursor-pointer text-3xl text-gray-100"></i>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                    <i className="fa-solid fa-trash-can text-3xl text-red-600"></i>
                        <h2 className="text-xl font-semibold leadi tracki">Are you sure you want to delete it?</h2>
                        <p className="flex-1 dark:text-gray-400">You are about to delete the following Client Details, this cannot be undone:</p>
                        <div className="flex flex-col justify-between gap-6 mt-6 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <button onClick={disDelete} className="px-6 py-2 rounded-md font-bold shadow-sm bg-slate-200 dark:text-gray-900">Cancel</button>
                            </div>
                            <button onClick={ConfirmDeletedBtn} className="px-6 py-2 rounded-md font-bold shadow-sm bg-red-600 dark:text-gray-900">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default DeleteEmp
