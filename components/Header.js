import Image from 'next/image'
import React from 'react'

function Header() {
    const headerMenu = [
        {
            id:1,
            name:'Ride',
            icon:'/taxi.png'
        },
        {
            id:2,
            name:'Package',
            icon:'/box.png'
        }
    ]
    return (
    <div className='p-5 pb-3 pl-10 border-b-[4px] border-gray-200'>
        <div>
            <Image src="/logo.png" 
            width={70}
            height={70}
            alt='Logo'
            />
        </div>
    </div>
    )
}

export default Header