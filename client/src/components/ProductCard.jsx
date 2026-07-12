function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-semibold mt-4">
        {product.name}
      </h2>

      <p className="text-gray-600">
        ₹{product.price}
      </p>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
        View Details
      </button>
    </div>
  );
}

export default ProductCard;