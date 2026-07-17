import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
    try {
        setLoading(true);

        const { data } = await api.get("/orders/myorders");

        setOrders(data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    };

    fetchOrders();
  }, []);
  if (loading) {
  return <Loader />;
  }
  return (
  <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
    <h1 className="text-4xl font-bold mb-8">My Orders</h1>

    {orders.length === 0 ? (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">

        <div className="text-7xl mb-5">
          📦
        </div>

        <h2 className="text-3xl font-bold mb-3">
          No Orders Yet
        </h2>

        <p className="text-gray-500 mb-8">
          You haven't placed any orders yet.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Start Shopping
        </button>

      </div>
    ) : (
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

              <div>
                <p className="text-gray-500 text-sm">
                  Order ID
                </p>

                <p className="font-semibold break-all">
                  {order._id}
                </p>

                <p className="mt-3 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                  {order.status}
                </span>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-indigo-600">
                  ₹{order.totalPrice}
                </p>

                <Link
                  to={`/orders/${order._id}`}
                  className="inline-block mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
                >
                  View Details
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default MyOrdersPage;