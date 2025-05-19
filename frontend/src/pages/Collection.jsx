import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import assets from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products ,search , showSearch  } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [brandFilter , setBrandFilter] = useState([]);
  const [priceFilter , setPriceFilter] = useState([]);
  const [sortType , setSortType] = useState("relevant");

  const toggleBrandFilter = (e) => {
    if(brandFilter.includes(e.target.value)){
      setBrandFilter(prev =>prev.filter((item) => item !== e.target.value));

    }else{
      setBrandFilter(prev => [...prev , e.target.value]);
    }
  }

  const togglePriceFilter = (e) => {
    if(priceFilter.includes(e.target.value)){
      setPriceFilter(prev =>prev.filter((item) => item !== e.target.value));  
    }else{
      setPriceFilter(prev => [...prev , e.target.value]);
    }
  }

 const applyFilter = () => {  
    let productsCopy = products.slice();


    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    

   if(brandFilter.length){
       productsCopy = productsCopy.filter(item=> brandFilter.includes(item.brand));
    }

    if(priceFilter.length >0){
    productsCopy = productsCopy.filter(item => priceFilter.includes(item.price == 50000 ? "50k" : item.price == 100000 ? "1L" : "1.5L"));
  }
  
    setFilterProducts(productsCopy);
 
  }
  

  const sortProducts = (e) => {
    let filteredProductsCopy = filterProducts.slice();
    
    switch(sortType){
      case "low-high":
        setFilterProducts(filteredProductsCopy.sort((a,b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filteredProductsCopy.sort((a,b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
  
  }}

  useEffect(() => {
  sortProducts();
}, [sortType]);


  useEffect(() => { 
    applyFilter();
  }
  , [brandFilter , priceFilter, search , showSearch]);

  

  return (
    <div className="flex flex-col sm:flex-row my-8 gap-1 sm:gap-10 pt-10 border-t">
      {/*Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="text-xl flex items-center cursor-pointer gap-1"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown_img"
          />
        </p>
        {/* Brand Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-4 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium ">BRAND </p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Samsung"} onChange={toggleBrandFilter}/>
              Samsung
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Vivo"} onChange={toggleBrandFilter} />
              Vivo
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Iqoo"} onChange={toggleBrandFilter} />
              iqoo
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Apple"} onChange={toggleBrandFilter} />
              Apple
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Google"} onChange={toggleBrandFilter} />
              Google
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Infinix"} onChange={toggleBrandFilter} />
              Infinix
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Xiaomi"} onChange={toggleBrandFilter}/>
              Xiaomi
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Itel"} onChange={toggleBrandFilter} />
              Itel
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Realme"} onChange={toggleBrandFilter} />
              Realme
            </p>
          </div>
        </div>
        {/* Price Filter */}

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium ">Price Range </p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"50k"} onChange={togglePriceFilter} />
              50k
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"1L"}  onChange={togglePriceFilter}/>
              1L
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"1.5L"} onChange={togglePriceFilter} />
              1.5L
            </p>
          </div>
        </div>
      </div>

      {/* Right side*/}

      <div className="flex-1 my-6">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Title  text1={'All'} text2={'Products'}/>
          {/*Sort products*/}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by Relavent</option>
            <option value="low-high">Sort by price low to high</option>
            <option value="high-low">Sort by price high to low</option>
          </select>

        </div>
        {/*Map  Products */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {
              filterProducts.map((item , index)=>(
                <ProductItem key={index} name={item.name} image={item.image} price={item.price} id={item._id} />
              ))
            }
        </div>
      </div>
    </div>
  )
}

export default Collection;
