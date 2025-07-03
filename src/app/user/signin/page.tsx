"use client";

import { signInUser } from "@/app/api/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Leaf, Factory, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

const Signin: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInUser(userData, router, setSuccess, setErrors);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/authpage.webp')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col"
      >
        {/* Başlıklar kısmı */}
        <div>
          <div className="flex justify-center mb-4">
            <Leaf className="text-green-600 w-10 h-10 animate-bounce" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Sign In To Your Carbon Account
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Track your emissions and stay CBAM compliant 🌍
          </p>
        </div>

        {/* Hata ve başarı mesajları */}
        <div>
          {errors.length > 0 && (
            <div className="mb-4 text-sm text-red-600">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {success && (
            <div className="mb-4 text-green-600 text-sm font-medium">
              {success}
            </div>
          )}
        </div>

        {/* inputlar buton ve link */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            Sign In
          </motion.button>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Dont have an account?{" "}
            <Link
              href="/user/signup"
              className="text-green-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signin;
