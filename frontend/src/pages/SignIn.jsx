import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom"; // Correct hook for navigation

const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook

  const { isLoading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the sign-in action
      await dispatch(signInUser({ name, password })).unwrap();
      alert("Signed in successfully");
      navigate("/"); // Redirect to home page after successful sign-in
    } catch (err) {
      console.error("Sign-in error: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Sign in</h1>
        <h2 className="text-lg text-gray-600 mb-6">to continue</h2>

        {/* Sign-in form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-label="Username"
          />
          <input
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
            className="w-full p-3 mb-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            disabled={isLoading}
            aria-live="assertive"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Display error message if present */}
        {error && (
          <p className="text-red-500 text-sm" aria-live="assertive">
            {error}
          </p>
        )}

        {/* Forgot password link */}
        <div className="text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>

      {/* Footer */}
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

export default SignIn;
