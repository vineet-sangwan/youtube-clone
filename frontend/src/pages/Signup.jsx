// src/components/SignUp.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../Redux/userSlice";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error, userInfo } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    dispatch(registerUser(userData)); // Dispatch the registerUser action
    Navigate("/login");
  };

  const handleErrorClear = () => {
    dispatch(clearError()); // Clear the error message
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Sign up</h1>
        <h2 className="text-lg text-gray-600 mb-6">to create a new account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-label="Username"
          />
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-label="Email"
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-label="Password"
          />
          <button
            type="submit"
            className="w-full p-3 mb-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
            disabled={isLoading}
            aria-live="assertive"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        {error && (
          <p
            className="text-red-500 text-sm"
            aria-live="assertive"
            onClick={handleErrorClear}
          >
            {error}
          </p>
        )}
        {userInfo && <p className="text-green-500">Registration successful!</p>}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign in instead
            </a>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center mt-6">
        <p className="text-xs text-gray-500">English (USA)</p>
        <div className="flex mt-2">
          <a href="#" className="text-sm text-gray-500 hover:underline ml-4">
            Help
          </a>
          <a href="#" className="text-sm text-gray-500 hover:underline ml-4">
            Privacy
          </a>
          <a href="#" className="text-sm text-gray-500 hover:underline ml-4">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
