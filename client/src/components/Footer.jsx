import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const location = useLocation();

    if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
    }
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white">
            🛍 ShopEase
          </h2>

          <p className="mt-4 text-gray-400">
            Your one-stop destination for premium smartphones at unbeatable
            prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>

            <Link to="/cart" className="hover:text-white transition">
              Cart
            </Link>

            <Link to="/orders" className="hover:text-white transition">
              My Orders
            </Link>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Connect
          </h3>

          <div className="flex gap-5 text-3xl">
            <a
              href="https://github.com/adityaksingh0612"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/aditya-singh-653652320/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center text-gray-400">
        © 2026 ShopEase. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;