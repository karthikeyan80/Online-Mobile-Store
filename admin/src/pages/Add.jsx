import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendUrl } from "../App";
import { assets } from "../assets/assets.js";

const Add = ({ token }) => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("100000"); // Default price set to 100000
  const [ram, setRam] = useState("8GB"); // Default RAM size set to 8GB
  const [brand, setBrand] = useState(""); // Added brand field
  const [image, setImage] = useState("");
  const [bestSeller, setBestSeller] = useState(false); // Added bestSeller field with default false
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "100000", // Default price set to 100000
    ram: "8GB", // Default RAM size set to 8GB
    brand: "", // Added brand field
    image: "",
    bestSeller: false, // Added bestSeller field with default false
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Sample image URLs for the 4 icons
  const sampleImages = [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2042&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=2080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=2081&auto=format&fit=crop",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSelect = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }));
    setPreviewUrl(imageUrl);
    setSelectedImage(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create a preview URL for the selected file
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
        setFormData((prev) => ({
          ...prev,
          image: fileReader.result,
        }));
      };
      fileReader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "100000",
          ram: "8GB",
          brand: "",
          image: "",
          bestSeller: false,
        });
        setPreviewUrl(""); // Clear the image preview
        setSelectedImage(null); // Clear the selected image
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-700 mb-6 pb-2 border-b border-gray-200">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <select
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="50000">₹50,000</option>
                <option value="100000">₹100,000</option>
                <option value="150000">₹150,000</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                RAM Size
              </label>
              <select
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="8GB">8GB</option>
                <option value="12GB">12GB</option>
                <option value="16GB">16GB</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>

              {/* Image preview */}
              {previewUrl && (
                <div className="mb-3">
                  <img
                    src={previewUrl}
                    alt="Selected preview"
                    className="h-40 w-auto mx-auto object-contain border rounded-md p-1"
                  />
                </div>
              )}

              {/* Sample image selection */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {sampleImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageSelect(img)}
                    className={`cursor-pointer border-2 rounded-md p-1 hover:border-purple-500 transition-colors ${
                      formData.image === img
                        ? "border-purple-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Sample ${index + 1}`}
                      className="h-16 w-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>

              {/* Upload from device option */}
              <div
                onClick={triggerFileInput}
                className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:border-purple-500 transition-colors"
              >
                <div className="text-center">
                  <img
                    src={assets.upload_area}
                    alt="Upload"
                    className="h-8 w-8 mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-600">
                    Click to upload from your device
                  </p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Hidden input to store the image URL/data */}
              <input type="hidden" name="image" value={formData.image} />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3">
                  Product Options
                </h3>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="bestSeller"
                    name="bestSeller"
                    checked={formData.bestSeller}
                    onChange={handleChange}
                    className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="bestSeller"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Mark as Best Seller
                  </label>
                </div>

                <div className="text-sm text-gray-600 mt-4">
                  <p>
                    • Best seller products will be highlighted on the homepage
                  </p>
                  <p>
                    • Make sure to add high-quality images for better visibility
                  </p>
                  <p>• All fields are required for product listing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-700 text-white font-medium rounded-md hover:bg-purple-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center"
            >
              <img
                src={assets.add_icon}
                alt="add"
                className="w-5 h-5 mr-2 filter brightness-0 invert"
              />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
