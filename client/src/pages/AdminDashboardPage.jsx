import { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/dashboard");
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500">Products</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold mt-2">
            ₹{stats.totalRevenue}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;