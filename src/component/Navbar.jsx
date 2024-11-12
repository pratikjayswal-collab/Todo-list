import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-white flex justify-around py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
