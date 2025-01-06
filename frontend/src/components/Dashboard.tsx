import React from 'react'
import Folder from './Folder'
import Navbar from './Navbar'

function Dashboard() {

  return (
    <div className='h-screen w-full bg-slate-50'>
      <Navbar />
      {/* <div className='flex bg-white border rounded-xl shadow-xl border-slate-400 p-20'>
        <Folder name="Folder 1" />
        <Folder name="Folder 2" />
        <Folder name="Folder 3" />
        <Folder name="Folder 4" />
        <Folder name="Folder 5" />
        <Folder name="Folder 6" />
        <Folder name="Folder 7" />
        <Folder name="Folder 8" />
      </div> */}
    </div>
  )
}

export default Dashboard