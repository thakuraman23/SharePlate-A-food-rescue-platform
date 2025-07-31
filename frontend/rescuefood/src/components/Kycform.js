import React from 'react'

const Kycform = () => {
  return (
    <div className=' md:w-1/2 mx-auto mt-5 p-3'>
        <h1 className='text-3xl mt-2'>Kyc Form</h1>
        <form className='flex flex-col text-center mt-2'>
            <input className='mt-2 px-2 py-1 outline-none' type='text' placeholder='Full Name'/>
            <input className='mt-2 px-2 py-1 outline-none'  type='email' placeholder='Email'/>
            <input className='mt-2 px-2 py-1 outline-none' type='text' placeholder='Phone No'/>
            <input className='mt-2 px-2 py-1 outline-none'  type='text' placeholder='Address Line 1'/>
            <input className='mt-2 px-2 py-1 outline-none'  type='text' placeholder='Address Line 2'/>
            <input className='mt-2 px-2 py-1 outline-none'  type='text' placeholder='City'/>
            <input className='mt-2 px-2 py-1 outline-none'  type='text' placeholder='State'/>
            <input className='mt-2 px-2 py-1 outline-none'  type='text' placeholder='Pincode'/>
            <input className='mt-2 px-2 py-1 outline-none'  type='text' placeholder='Country'/>


            <input  className='mt-2 px-2 py-1'  type='text' placeholder='GST No'/>
            <div className='flex content-center mt-2 px-2 py-1 justify-between'><p>Upload Document Proof</p>
            <input  type='file' /></div>
            

        </form>
    </div>
  )
}

export default Kycform