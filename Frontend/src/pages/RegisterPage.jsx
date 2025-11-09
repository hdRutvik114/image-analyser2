import { useState } from "react";
import { Link } from "react-router-dom";


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setMessage(data.message);
    console.log(data);
  };

  return (



    <div className="flex flex-1 p-5 min-h-[calc(100vh-77px)] text-white">
 {/* Left Side - About Section */}
<div className="hidden md:flex w-1/2 flex-col items-center justify-center px-10 text-white space-y-6">
  <div className="text-center">
    <h1 className="text-5xl font-extrabold mb-4 leading-tight">
      Welcome to <span className="text-blue-400">Image Analyser</span>
    </h1>
    <p className="text-lg text-gray-300 max-w-md mx-auto">
      Discover a smarter way to  <br />learn, and grow.  
      Powered by Ai.
    </p>
  </div>

  {/* Image Container */}
  <div className="relative w-[100%] max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-700 ease-in-out hover:shadow-blue-700/40">
    <img
      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
      alt="Student studying"
      className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700 ease-in-out"
    />

    {/* Subtle overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
  </div>
</div>

  {/* Right Side - Signup Form */}
  <div className="flex w-full md:w-1/2 items-center justify-center p-6">
    <div className="w-full max-w-md border border-gray-500 rounded-2xl shadow-2xl p-8 backdrop-blur-md bg-white/5">
      <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
      <p className="text-center text-gray-300 mb-6 text-sm">
        Join us and start your journey with Insight ✨
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300 text-white"
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
            className="w-full px-4 py-2 border border-gray-400 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300 text-white"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.98] transition duration-200"
        >
          Sign Up
        </button>
      </form>

      {message && (
        <p className="text-center text-sm mt-4 text-gray-200">{message}</p>
      )}

      <p className="text-sm text-center mt-6 text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>
</div>


  );
}
