import { useState, useEffect } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
  try {
    const { data } = await api.get("/products");

    console.log("API Response:", data);

    setProducts(data);
  } catch (error) {
    console.log(error);
  }
  };
  useEffect(() => {
  fetchProducts();
  }, []);
  console.log(products);
  return (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-6">Products</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard
      key={product._id}
      product={product}
    />
  ))}
</div>
  </div>
);
}

export default HomePage;