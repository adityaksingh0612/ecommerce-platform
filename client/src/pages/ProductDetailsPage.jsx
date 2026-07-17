import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function ProductDetailsPage() {
    const { id } = useParams();
    const { token } = useSelector((state) => state.auth);

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
    const fetchProduct = async () => {
        try {

            const { data } = await api.get(`/products/${id}`);

            setProduct(data);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };

    fetchProduct();
    }, [id]);

    if (!product) {
        return <h2>Loading...</h2>;
    }
    const handleAddToCart = async () => {
  try {
    const { data } = await api.post(
      "/cart",
      {
        productId: product._id,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add to cart");
  }
    };
    return (
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="grid md:grid-cols-2 gap-10 p-10">

            {/* Product Image */}
            <div className="bg-gray-100 rounded-xl flex items-center justify-center p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-h-[500px] object-contain hover:scale-105 transition duration-300"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">

              <h1 className="text-4xl font-bold text-gray-800">
                {product.name}
              </h1>

              <p className="text-3xl font-bold text-blue-600 mt-6">
                ₹{product.price.toLocaleString()}
              </p>

              <div className="mt-5">
                {product.countInStock > 0 ? (
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                    ✓ In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">
                  Description
                </h2>

                <p className="text-gray-600 leading-7">
                  {product.description}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-3">Quantity</h3>

                <div className="flex items-center gap-4">

                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 text-xl font-bold"
                  >
                    -
                  </button>

                  <span className="text-xl font-semibold w-8 text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(product.countInStock, prev + 1)
                      )
                    }
                    className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 text-xl font-bold"
                  >
                    +
                  </button>

                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="mt-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-semibold transition"
              >
                Add To Cart
              </button>

            </div>

          </div>

        </div>
      </div>
    );
}

export default ProductDetailsPage;