"use client";
import Image from "next/image";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log("Form submitted:", { email, password });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#093545] font-montserrat">
      <div className="w-full max-w-sm p-8 rounded-lg">
        <h1 className="text-[64px] font-semibold text-center text-white mb-8">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-[10px] text-[14px] placeholder-gray-400 transition-all duration-200
              ${
                errors.email
                  ? "border border-red-400 bg-[#23404c] text-white focus:border-red-400"
                  : "border border-transparent bg-[#23404c] text-white focus:bg-white focus:text-[#23404c] focus:border-[#23404c]"
              } focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-[10px] text-[14px] placeholder-gray-400 transition-all duration-200
              ${
                errors.password
                  ? "border border-red-400 bg-[#23404c] text-white focus:border-red-400"
                  : "border border-transparent bg-[#23404c] text-white focus:bg-white focus:text-[#23404c] focus:border-[#23404c]"
              } focus:outline-none`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-center space-x-3 mt-2">
            <label
              htmlFor="remember"
              className="relative flex items-center cursor-pointer"
            >
              <input
                id="remember"
                type="checkbox"
                className="peer appearance-none w-5 h-5 rounded-md bg-[#23404c] border-none cursor-pointer checked:bg-[#23404c] focus:outline-none"
              />
              <span className="absolute text-[#2BD17E] text-[18px] left-[3px] top-[-1px] opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                ✓
              </span>
            </label>
            <span className="text-white text-[16px] select-none">
              Remember me
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-[15px] mt-2 text-white font-semibold bg-[#2BD17E] rounded-[10px] hover:bg-green-500 transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
      <Image  
        src="/bg-wave.png"
        alt="wave background"
        width={1920}
        height={300}
        className="absolute bottom-0 w-full"
        priority
      />
    </div>
  );
};

export default LoginPage;
