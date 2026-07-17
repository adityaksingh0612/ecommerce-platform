import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

      {/* Product Image */}
      <div className="h-64 bg-gray-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800">
          {product.name}
        </h2>

        <p className="text-2xl font-bold text-blue-600 mt-2">
          ₹{product.price.toLocaleString()}
        </p>

        <div className="mt-3">
          {product.countInStock > 0 ? (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              In Stock
            </span>
          ) : (
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          )}
        </div>

        <Link
          to={`/products/${product._id}`}
          className="mt-5 block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-semibold transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;