import Image from 'next/image';
import React from 'react'

const Footer = () => {

    const links = ["Services", "Bolgs", "Contact"];

    return (
        <div>
            <nav className='bg-gray-800 flex justify-between items-center height-20 p-4'>
                <Image
                    alt='logo'
                    src="/logo.svg"
                    height="100"
                    width='50'
                    className=' h-10 w-20 rounded-md text-white bg-white'
                />
               <p className='text-green-400'>© copyright all rights reserved</p> <p className='text-green-400'>Developed by BilliMD corp dev: Ankush N</p>
            </nav>
        </div>
    )
}

export default Footer