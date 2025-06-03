import { useState } from "react";
import { backendUrl, currency } from "../App";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      console.log("Removing product with ID:", id);
      const response = await axios.delete(backendUrl + "/api/product/remove", {
        headers: { token },
        data: { id }, // For DELETE requests, the body needs to be sent in the 'data' property
      });
      console.log("Remove product response:", response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error removing product:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List </p>
      <div className="flex flex-col gap-2">
        {/* Table for displaying the list of products */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Brand</b>
          <b className="text-center">Action </b>
        </div>

        {/*Product List*/}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={item._id || index}
          >
            <img className="w-12" src={item.image[0]} alt="item_img" />
            <p>{item.name}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p>{item.brand}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
