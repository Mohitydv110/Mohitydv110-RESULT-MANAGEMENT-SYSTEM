import React from 'react';
import './../App.css';

function Home() {
  return (
    <div>
        <header align="center" className='flex justify-between bg-black text-white p-5 mb-10'>
          <h1 className='text-4xl'><a href='/'>ABC Institute of Technology</a></h1>
          <h1><a href='/login' className='text-2xl underline'>Login for Admins</a></h1>
        </header>

        <img src='https://media.licdn.com/dms/image/D4D12AQHBA_VLb0xV7Q/article-cover_image-shrink_600_2000/0/1693492057115?e=2147483647&v=beta&t=d00Uug6G62zmYvKIhsaXx77ej2dxEESY6GWelLMAY_0' 
        className='mx-auto'/>

        <div align='center' className='mt-10'>
          <h1 className='text-4xl'><a href={'/viewResults'} className='bg-orange-400 py-5 w-[40%] font-mono rounded-lg block text-white m-5'>View Results Page</a></h1>
          <h1 className='text-4xl'><a href={'/login'} className='bg-orange-400 py-5 w-[40%] font-mono rounded-md block text-white m-5'>Login for Admins</a></h1>
        </div>
    </div>
  )
}

export default Home;