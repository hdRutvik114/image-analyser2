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
    <div className="min-h-[calc(100%-77px)] flex ">
      {
         (islogedin)?<Homei />:
      <div className="flex flex-1 p-5">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-50">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
            alt="Student"
            className="w-full h-full object-cover border-1"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex w-full md:w-1/2 items-center justify-center p-6">
          <div className="w-full max-w-md border rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
             <Link to="/register" className="text-blue-600 hover:underline">
               signup
             </Link>
            </p>
          </div>
        </div>
      </div>
      }
    </div>
  );
}
