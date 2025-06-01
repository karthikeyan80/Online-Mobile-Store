import React, { useState } from "react";
import { assets } from "../assets/assets";

const Add = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("Vivo");
  const [ram, setRam] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  return (
    <form className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2 ">Uploaad Image </p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload_img"
            />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload_img"
            />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload_img"
            />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload_img"
            />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name </p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter your product name"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 max-w-full sm:gap-8 ">
        <div>
          <p className="mb-2">Product Brand</p>
          <select
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            className="w-full px-3 py-2"
          >
            <option value="Vivo">Vivo</option>
            <option value="Oppo">Oppo</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Oneplus"> Oneplus</option>
            <option value="Infinix"> Infinix</option>
            <option value="Google"> Google</option>
            <option value="Xioami"> Xioami</option>
            <option value="Realme">Realme</option>
          </select>
        </div>
<div>
  <p className="mb-2">Product price</p>
  <select
    onChange={(e) => setPrice(e.target.value)}
    value={price}
    className="w-full px-3 py-2 sm:w-[120px]"
  >
    <option value="50000">50,000</option>
    <option value="100000">100,000</option>
    <option value="150000">150,000</option>
  </select>
</div>

      </div>

      <div>
        <p className="mb-2">Product RAM Types </p>
        <div className="flex gap-3">
          <div onClick={() => setRam(prev => prev.includes("8GB")) ? prev.filter((item)=> item !== "8GB") : [...prev , "8GB"] } className="cursor-pointer">
            <p className={`${ram.includes("8GB")} ?bg-green-700 : bg-slate-300 '} px-3 py-1 cursor-pointer `}>8GB</p>
          </div>
          <div onClick={() => setRam(prev => prev.includes("12GB")) ? prev.filter((item)=> item !== "12GB") : [...prev , "12GB"] } className="cursor-pointer">
            <p className="bg-slate-300 px-3 py-1 cursor-pointer ">12GB</p>
          </div>
          <div onClick={() => setRam(prev => prev.includes("16GB")) ? prev.filter((item)=> item !== "16GB") : [...prev , "16GB"] } className="cursor-pointer">
            <p className="bg-slate-300 px-3 py-1 cursor-pointer ">16GB</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to BestSeller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white ">
        ADD{" "}
      </button>
    </form>
  );
};

export default Add;
