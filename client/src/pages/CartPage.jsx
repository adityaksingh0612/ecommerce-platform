import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

function CartPage() {
  const navigate = useNavigate();
  // 1️⃣ Create state
  const [cartItems, setCartItems] = useState([]);

  // 2️⃣ Get token from Redux
  const { token } = useSelector((state) => state.auth);

  // 3️⃣ Print cart items (for debugging)
  const fetchCart = useCallback(async () => {
  try {
    const { data } = await api.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCartItems(data);
  } catch (error) {
    console.error(error);
  }
}, [token]);
  // 4️⃣ Fetch cart when page loads
  useEffect(() => {
  if (token) {
    fetchCart();
  }
}, [token, fetchCart]);
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const { data } = await api.put(
        `/cart/${cartItemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      // Refresh the cart after updating
      await fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cart");
    }
  };
  const removeItem = async (cartItemId) => {
    try {
      const { data } = await api.delete(`/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);

      // Refresh the cart
      await fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };
  const totalPrice = cartItems.reduce((total, item) => {
  return total + item.product.price * item.quantity;
  }, 0);
  // 5️⃣ Return JSX
  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Section - Cart Items */}
        <div className="lg:col-span-2">

          {cartItems.length === 0 && (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">

              <div className="text-7xl mb-5">
                🛒
              </div>

              <h2 className="text-3xl font-bold mb-3">
                Your cart is empty
              </h2>

              <p className="text-gray-500 mb-8">
                Looks like you haven't added anything yet.
              </p>

              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Continue Shopping
              </button>

            </div>
          )}

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 mb-6"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-32 h-32 object-contain bg-gray-50 p-3 rounded-xl border"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-semibold">
                  {item.product.name}
                </h2>

                <p className="text-blue-600 text-xl font-bold mt-2">
                  ₹{item.product.price}
                </p>

                <p className="text-gray-500 mt-2">
                  Qty: {item.quantity}
                </p>

                <p className="font-semibold text-lg mt-1">
                  Subtotal: ₹{item.product.price * item.quantity}
                </p>

                <div className="flex items-center gap-4 mt-5">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, Math.max(1, item.quantity - 1))
                    }
                    className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 text-xl font-bold"
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                    className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="mt-5 flex items-center gap-2 text-red-600 hover:text-red-700 transition font-medium"
                >
                  <FaTrash />
                  Remove
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* Right Section - Cart Summary */}
        <div className="lg:col-span-1">

          {cartItems.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">
                Cart Summary
              </h2>

              <div className="flex justify-between mb-3">
                <span>Total Items</span>
                <span className="font-semibold">
                  {cartItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="space-y-4 mb-8">

              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600 font-semibold">
                  FREE
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

            </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
              >
                Proceed to Checkout
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default CartPage;