"use client";

import { signInUser } from "@/app/api/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="mb-4">
            <ul className="text-red-500">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {success && (
          <div className="mb-4">
            <div>{success}</div>
          </div>
        )}

        <input
          type="email"
          placeholder="Enter your email address"
          onChange={handleChange}
          name="email"
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          name="password"
        />

        <button type="submit">Continue</button>
      </form>

      <Link href={"/user/signup"}>If you dont have an account.</Link>
    </div>
  );
};

export default Signin;
