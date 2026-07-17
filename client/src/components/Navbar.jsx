import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = ({ search, setSearch }) => {
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        {/* Logo */}
        <Link
        to="/"
        className="text-3xl font-extrabold text-blue-600 tracking-wide"
        >
        🛍 ShopEase
        </Link>

        {/* Navigation */}
        <div className="w-full md:w-96 order-3 md:order-none">
        <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
            setSearch(e.target.value);
            navigate("/");
        }}
        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6">

          <Link
        to="/"
        className="text-2xl md:text-3xl font-extrabold text-blue-600 tracking-wide"
        >
            Home
          </Link>

          {token && (
            <>
              <Link
                to="/cart"
                className="hover:text-blue-600 transition"
              >
                Cart
              </Link>

              <Link
                to="/orders"
                className="hover:text-blue-600 transition"
              >
                My Orders
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;