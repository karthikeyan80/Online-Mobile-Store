import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import assets from "../assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [RAM, setRAM] = useState("");
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="flex flex-col gap-6 mt-18">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Image */}
        <div className="flex sm:w-[55%] flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-[22%]">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-20 h-20 object-contain border rounded cursor-pointer"
                alt={`preview-${index}`}
              />
            ))}
          </div>

          <div className="flex justify-center items-center sm:w-[78%]">
            <img
              src={image}
              alt="main"
              className="w-full max-w-md object-contain aspect-[4/5] rounded border-none"
            />
          </div>
        </div>
        {/* Product Details */}
        <div className="sm:w-[45%]">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} className="w-3" src={assets.star_icon} alt="star" />
            ))}
            <img className="w-3" src={assets.star_dull_icon} alt="star" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 leading-relaxed">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select RAM </p>
            <div className="flex gap-2">
              {productData.RAM.map((item, index) => (
                <button
                  onClick={() => setRAM(item)}
                  className={`border border-gray-800 py-2 px-4 bg-gray-100 ${
                    item === RAM
                      ? "border-blue-700black"
                      : " border-transparent"
                  } `}
                  key={index}
                >
                  {item}{" "}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white py-2 px-2 active:bg-gray-100" onClick={()=> addToCart(productData._id, RAM)}>
            ADD TO CART
          </button>
          <hr className="mt-6 mb-8  sm:w-4/5 " />
          <div className="text-sm text-gray-500 flex flex-col gap-1 mb-5">
            <p>100% original product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7days.</p>
          </div>
        </div>
      </div>

      {/* Product Specification */}

      <div className="w-full mt-10 clear-both">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Specification</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p className="font-medium text-black">General</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Brand</p>
              <p>{productData.brand}</p>
            </div>
            <div>
              <p className="font-medium">Model</p>
              <p>{productData.name}</p>
            </div>
          </div>

          <hr className="my-2" />

          <p className="font-medium text-black">Display</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Screen Type</p>
              <p>AMOLED Display</p>
            </div>
            <div>
              <p className="font-medium">Screen Size</p>
              <p>6.7 inches</p>
            </div>
            <div>
              <p className="font-medium">Resolution</p>
              <p>1080 x 2400 pixels</p>
            </div>
            <div>
              <p className="font-medium">Refresh Rate</p>
              <p>120 Hz</p>
            </div>
          </div>

          <hr className="my-2" />

          <p className="font-medium text-black">Performance</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Processor</p>
              <p>Snapdragon 8 Gen 2 / MediaTek Dimensity</p>
            </div>
            <div>
              <p className="font-medium">RAM Options</p>
              <p>{productData.RAM.join(", ")}</p>
            </div>
            <div>
              <p className="font-medium">Storage</p>
              <p>128GB / 256GB / 512GB</p>
            </div>
            <div>
              <p className="font-medium">Operating System</p>
              <p>Android 14</p>
            </div>
          </div>

          <hr className="my-2" />

          <p className="font-medium text-black">Camera</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Main Camera</p>
              <p>50MP + 12MP Ultra-wide + 10MP Telephoto</p>
            </div>
            <div>
              <p className="font-medium">Front Camera</p>
              <p>32MP</p>
            </div>
            <div>
              <p className="font-medium">Video Recording</p>
              <p>4K@60fps, 8K@24fps</p>
            </div>
            <div>
              <p className="font-medium">Camera Features</p>
              <p>Night Mode, Portrait Mode, HDR</p>
            </div>
          </div>

          <hr className="my-2" />

          <p className="font-medium text-black">Battery & Charging</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Battery Capacity</p>
              <p>5000 mAh</p>
            </div>
            <div>
              <p className="font-medium">Fast Charging</p>
              <p>67W Wired, 30W Wireless</p>
            </div>
          </div>

          <hr className="my-2" />

          <p className="font-medium text-black">Connectivity</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">5G Support</p>
              <p>Yes</p>
            </div>
            <div>
              <p className="font-medium">Wi-Fi</p>
              <p>Wi-Fi 6E</p>
            </div>
            <div>
              <p className="font-medium">Bluetooth</p>
              <p>Bluetooth 5.3</p>
            </div>
            <div>
              <p className="font-medium">USB Type</p>
              <p>USB Type-C</p>
            </div>
          </div>

          <hr className="my-2" />

          <p className="font-medium text-black">Other Features</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Fingerprint Sensor</p>
              <p>In-display</p>
            </div>
            <div>
              <p className="font-medium">Water Resistance</p>
              <p>IP68</p>
            </div>
            <div>
              <p className="font-medium">NFC</p>
              <p>Yes</p>
            </div>
            <div>
              <p className="font-medium">Sensors</p>
              <p>Accelerometer, Gyro, Proximity, Compass</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
