import { useState, useEffect } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function HomePage({ search }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
  try {
    setLoading(true);

    const { data } = await api.get("/products");

    setProducts(data);
  } catch {
  toast.error("Failed to fetch products");
} finally {
    setLoading(false);
  }
  };
  useEffect(() => {
  fetchProducts();
  }, []);
  const filteredProducts = products.filter((product) =>
  product.name
    .toLowerCase()
    .split(" ")
    .some((word) => word.startsWith(search.toLowerCase()))
  );
  if (loading) {
  return <Loader />;
  }
  return (
  <div className="bg-gray-100 min-h-screen">
    {/* Hero Section */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">

        <h1 className="text-5xl font-extrabold">
          Welcome to ShopEase
        </h1>

        <p className="text-xl mt-6 text-blue-100">
          Discover the latest smartphones at unbeatable prices.
        </p>

        <button
          onClick={() =>
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </button>

      </div>
    </div>

    <h2 className="text-4xl font-bold text-gray-800 mb-8">
      Featured Products
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {filteredProducts.map((product) => (
    <ProductCard
      key={product._id}
      product={product}
    />
  ))}
  <div
    id="products"
    className="max-w-7xl mx-auto px-8 py-12"
  >
  </div>
  {filteredProducts.length === 0 && (
    <div className="text-center py-12">
      <h3 className="text-2xl font-semibold text-gray-600">
        No products found
      </h3>
      <p className="text-gray-500 mt-2">
        Try searching with a different keyword.
      </p>
    </div>
  )}
  </div>
  </div>
);
}

export default HomePage;