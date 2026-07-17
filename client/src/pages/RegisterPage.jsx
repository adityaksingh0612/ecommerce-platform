import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandler = async (e) => {
  e.preventDefault();

  try {
    const { data } = await api.post("/auth/register", {
      name,
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

    toast.success("Registration successful");
    navigate("/");
  } catch (error) {

  toast.error(error.response?.data?.message || "Registration failed");
}
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={registerHandler}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Name</label>

            <input
                type="text"
                placeholder="Enter your Name"
                className="w-full border rounded-lg p-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
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
            Register
          </button>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
                Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;