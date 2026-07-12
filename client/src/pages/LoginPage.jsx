import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCredentials, logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
  e.preventDefault();

  try {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    dispatch(
      setCredentials({
        user: data.user,
        token: data.token,
      })
    );
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login Successful");
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
  };
  const logoutHandler = () => {
  console.log("Logout Handler Started");

  dispatch(logout());
  console.log("Redux Cleared");

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  console.log("Local Storage Cleared");

  console.log("User:", localStorage.getItem("user"));
  console.log("Token:", localStorage.getItem("token"));

  navigate("/login");

  console.log("Navigate Called");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={loginHandler}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </form>
        <button
  onClick={logoutHandler}
  className="mt-4 w-full bg-red-600 text-white py-3 rounded-lg"
>
  Logout
</button>
      </div>
    </div>
  );
}

export default LoginPage;