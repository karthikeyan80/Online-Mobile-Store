
import assets from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import Title from '../components/Title';

const Contact = () => {
  return (
    <div>
      <div className='text-center font-black text-2xl border-t pt-[80px]'>
        <Title text1={'Contact'} text2={'Us'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="contact_img" className='w-full max-w-[480px]' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500 '>45802 , Will Station <br /> Suite 390, Washington , USA </p>
          <p className='text-gray-500 '>Phone no: 8847939781 <br />Email : Mobistore@gmail.com </p>
          <p className='fonnt-semibold text-xl text-gray-600'>Careers at MobiStore</p>
            <p className='text-gray-500 '>Learn more about our open positions and apply today!</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>

        </div>

      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact;