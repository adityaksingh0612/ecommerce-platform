import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";

const OrderDetailsPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
  return <Loader />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>

        {/* Order Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
            <div>
            <p className="text-gray-500 text-sm">Order ID</p>
            <p className="font-semibold break-all">{order._id}</p>

            <p className="text-gray-500 text-sm mt-4">Placed On</p>
            <p>
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                })}
            </p>
            </div>

            <div className="space-y-4">
            <div>
                <p className="text-gray-500 text-sm">Payment</p>

                <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    order.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
                >
                {order.isPaid ? "✅ Paid" : "⏳ Pending"}
                </span>
            </div>

            <div>
                <p className="text-gray-500 text-sm">Order Status</p>

                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                🚚 {order.status}
                </span>
            </div>
            </div>
        </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Products</h2>

        <div className="space-y-5">
            {order.orderItems.map((item) => (
            <div
                key={item._id}
                className="flex gap-5 border-b pb-5 last:border-none"
            >
                <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                <h3 className="font-semibold text-lg">
                    {item.product.name}
                </h3>

                <p className="text-gray-600 mt-2">
                    ₹{item.product.price} × {item.quantity}
                </p>

                <p className="font-semibold mt-2">
                    Subtotal ₹{item.product.price * item.quantity}
                </p>
                </div>
            </div>
            ))}
        </div>

        <div className="border-t mt-6 pt-6 flex justify-between items-center">
            <div>
            <p className="text-gray-500">
                Total Items
            </p>

            <p className="font-semibold">
                {order.orderItems.reduce(
                (sum, item) => sum + item.quantity,
                0
                )}
            </p>
            </div>

            <div className="text-right">
            <p className="text-gray-500">Total Price</p>

            <p className="text-2xl font-bold text-indigo-600">
                ₹{order.totalPrice}
            </p>
            </div>
        </div>
        </div>
    </div>
    );
};

export default OrderDetailsPage;