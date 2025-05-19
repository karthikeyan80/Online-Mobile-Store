
import { useContext ,useEffect,useState} from 'react';
import assets from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search , setSearch , showSearch , setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [visible , setVisible] = useState(false);

    useEffect(()=>{
      if(location.pathname.includes('collection') ){
          setVisible(true)
      }else{
          setVisible(false)
      }
    },[location])


  return showSearch && visible ? (
    <div className='border-t border-b text-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 my-18 py-2 mb-0 mx-3 rounded-full w-3/4 sm:w-1/2 bg-gray-50'>

      <input
  type='text'
  placeholder='Search'
  className='w-full bg-transparent text-sm text-black placeholder-gray-500 focus:outline-none'
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  autoFocus
/>



        <img className='w-4' src={assets.search_icon} alt="search_icon" />
        </div>
        <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer mb-2' src={assets.cross_icon} alt="cross_icon" />

    </div>
  ) : null;
}

export default SearchBar