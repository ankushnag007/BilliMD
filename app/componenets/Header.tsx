import Image from 'next/image';
import React from 'react'

const Header = () => {

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
                <ul className='flex justify-start gap-6 list-none text-gray-300'>
                    {links.map((link) =>
                        <li key={link}><a href=''>{link}</a></li>)}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                </ul>
            </nav>
        </div>
    )
}

export default Header