"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  BarChart,
  Settings,
  LogOut,
  Leaf,
  Building2,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: <Home size={18} />, href: "/dashboard" },
  { label: "Ürün Ekleme", icon: <BarChart size={18} />, href: "/details" },
  { label: "Şirketler", icon: <Building2 size={18} />, href: "/sirketler" },
];

const otherItems = [
  { label: "Ayarlar", icon: <Settings size={18} />, href: "/ayarlar" },
  { label: "Çıkış Yap", icon: <LogOut size={18} />, href: "/logout" },
];

const Navbar = () => {
  return (
    <div className="h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between py-6">
      <div>
        <div className="text-xl font-bold text-center text-green-700 mb-8 flex items-center justify-center gap-2">
          <Leaf size={24} /> CarbonTrack
        </div>

        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-100/40 hover:text-green-700 transition cursor-pointer rounded-r-full"
              >
                <span className="mr-3 text-green-600">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6">
        <ul className="space-y-2">
          {otherItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center py-3 text-gray-500 hover:bg-gray-100 transition cursor-pointer rounded-r-full"
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
