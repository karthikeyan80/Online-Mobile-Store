import React from 'react'

const NewsletterBox = () => {

    const onSumbitHandler = (event)=>{
        event.preventDefault()
    }

  return (
    <div className='text-center'>
<p className='text-2xl font-medium text-gray-800'>Subscribe Now and get 20% offer</p>
<p className='mt-3 text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius libero perspiciatis sed accusantium dolorem. Aut illo veniam eligendi, optio laboriosam beatae, laborum cumque voluptates, mollitia delectus numquam reiciendis voluptas. Sunt.</p>
    <form onSubmit={onSumbitHandler} className='w-full sm:w-1/2 mx-auto gap-3 flex items-center my-6 border pl-3 '>
        <input type='email' placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required />
        <button type='submit' className='bg-black text-white text-s px-10 py-4 '>SUBSCRIBE</button>
    </form>
    </div>
  )
}

export default NewsletterBox