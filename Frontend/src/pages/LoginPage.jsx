import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Homei from "./Home.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
 const [islogedin, setislogedin] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setislogedin(data)
    console.log(data);
  };


  return (
    <div className="min-h-[calc(100vh-78px)] flex flex-col bg-gradient-to-br   overflow-y-auto">
  {islogedin ? (
    <Homei />
  ) : (
    <div className="flex flex-1 flex-col md:flex-row p-6 md:p-10 items-center justify-center gap-10">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white rounded-3xl shadow-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
          alt="Student studying"
          className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="w-full max-w-md  border border-gray-200 rounded-3xl shadow-2xl p-8 md:p-10">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
            Welcome Back 👋
          </h2>
          <p className="text-center text- mb-8 text-white t-sm">
            Log in to continue your journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.98] transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-white">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )}
</div>

  );
}
