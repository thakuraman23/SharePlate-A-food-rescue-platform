import React from 'react'
import reslogo from "../images/reslogo.jpg"

const Profile = () => {
  return (
    <div className='text-center'>
        <div className='text-center content-center'>
        <img className=' rounded-full mx-auto my-3' src={reslogo} alt='logo'/>
        <h1 className='text-3xl'>Restaurant Name</h1>
        <h1 className='text-3xl'>#AB68278219BC</h1>
        </div>

        <div className='text-2xl mt-5'>
        <p>NIT Warangal Road, Hanamkonda, 506004</p>
        <p>Kyc Staus : Done</p>
        <p>GST No : 18KA913H08002001SJ</p>
        <p>+91 9876543210</p>
        </div>
        <div>
            <button className='text-lg bg-orange-400 px-2 py-1 rounded-lg'>Edit Profile</button>
        </div>
    </div>
  )
}

export default Profile