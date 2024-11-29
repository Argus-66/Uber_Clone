import { SignIn } from '@clerk/nextjs'
import Image from "next/image";

export default function Page() {
    return (
        <>
        <div> 
            <Image 
            src="/uberbanner.jpeg" 
            layout="fill"
            objectFit="cover"
            alt="Uber banner image"
            />

            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <SignIn />
            </div>
            
        </div>
        </>
    );
}