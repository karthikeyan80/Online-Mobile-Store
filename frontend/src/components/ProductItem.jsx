import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id , image , name , price }) => {
    const {currency} = useContext(ShopContext) ;


  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer '>
       <div className="w-full h-48 flex justify-center items-center">
    <img
      src={image[0]}
      alt={name}
      className="max-h-full object-contain"
    />
  </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium '>{currency}{price}</p>

    </Link>
  )
}

export default ProductItem