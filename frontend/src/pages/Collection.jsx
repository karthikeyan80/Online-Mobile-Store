import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import assets from "../assets/assets";
import Title from "../components/Title";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);

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
              <input type="checkbox" className="w-3" value={"Samsung"} />
              Samsung
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Vivo"} />
              Vivo
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Iqooo"} />
              Iqoo
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Oppo"} />
              Oppo
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Apple"} />
              Apple
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Google"} />
              Google
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Infinix"} />
              Infinix
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Xiaomi"} />
              Xiaomi
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Itel"} />
              Itel
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Realme"} />
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
              <input type="checkbox" className="w-3" value={"50k"} />
              50k
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"1L"} />
              1L
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"1.5L"} />
              1.5L
            </p>
          </div>
        </div>
      </div>

      {/* Right side*/}

      <div className="flex-1 my-6">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Title  text1={'All'} text2={'Products'}/>

        </div>
      </div>
    </div>
  );
};

export default Collection;
