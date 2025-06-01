import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("50000");
  const [brand, setBrand] = useState("Vivo");
  const [ram, setRam] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Require at least one RAM type
  if (ram.length === 0) {
    alert("Please select at least one RAM option.");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("bestseller", bestseller);
    formData.append("RAM", JSON.stringify(ram));

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    if (!backendUrl) {
      console.error("Backend URL is not defined");
      return;
    }

    console.log("Sending request to:", `${backendUrl}/api/product/add`);

    const response = await axios.post(
      `${backendUrl}/api/product/add`,
      formData,
      {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if(response.data.success){
      toast.success("Product added successfully!");
      setName("");
      setDescription("");
      setBestseller(false);
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);

    }

    console.log("Response:", response.data);
   
    // Reset form or show success message here
  } catch (error) {
    console.error("Error submitting form:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2 ">Uploaad Image </p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={
                image1 instanceof File
                  ? URL.createObjectURL(image1)
                  : assets.upload_area
              }
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
              src={
                image2 instanceof File
                  ? URL.createObjectURL(image2)
                  : assets.upload_area
              }
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
              src={
                image3 instanceof File
                  ? URL.createObjectURL(image3)
                  : assets.upload_area
              }
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
              src={
                image4 instanceof File
                  ? URL.createObjectURL(image4)
                  : assets.upload_area
              }
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
          <div
            onClick={() =>
              setRam((prev) =>
                prev.includes("8GB")
                  ? prev.filter((item) => item !== "8GB")
                  : [...prev, "8GB"]
              )
            }
            className="cursor-pointer"
          >
            <p
              className={`${
                ram.includes("8GB") ? "bg-green-700" : "bg-slate-300"
              } px-3 py-1 cursor-pointer`}
            >
              8GB
            </p>
          </div>
          <div
            onClick={() =>
              setRam((prev) =>
                prev.includes("12GB")
                  ? prev.filter((item) => item !== "12GB")
                  : [...prev, "12GB"]
              )
            }
            className="cursor-pointer"
          >
            <p
              className={`${
                ram.includes("12GB") ? "bg-green-700" : "bg-slate-300"
              } px-3 py-1 cursor-pointer`}
            >
              12GB
            </p>
          </div>
          <div
            onClick={() =>
              setRam((prev) =>
                prev.includes("16GB")
                  ? prev.filter((item) => item !== "16GB")
                  : [...prev, "16GB"]
              )
            }
            className="cursor-pointer"
          >
            <p
              className={`${
                ram.includes("16GB") ? "bg-green-700" : "bg-slate-300"
              } px-3 py-1 cursor-pointer`}
            >
              16GB
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
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
