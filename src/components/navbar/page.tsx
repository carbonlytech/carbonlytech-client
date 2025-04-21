import React from "react";
import {
  Home,
  Users,
  GraduationCap,
  User,
  Book,
  ClipboardList,
  FileText,
  BarChart,
  Calendar,
  Mail,
  Megaphone,
  Settings,
  LogOut
} from "lucide-react";

const menuItems = [
  { label: "Home", icon: <Home size={18} /> },
  { label: "Teachers", icon: <Users size={18} /> },
  { label: "Students", icon: <GraduationCap size={18} /> },
  { label: "Parents", icon: <User size={18} /> },
  { label: "Subjects", icon: <Book size={18} /> },
  { label: "Classes", icon: <ClipboardList size={18} /> },
  { label: "Lessons", icon: <Book size={18} /> },
  { label: "Exams", icon: <FileText size={18} /> },
  { label: "Assignments", icon: <ClipboardList size={18} /> },
  { label: "Results", icon: <BarChart size={18} /> },
  { label: "Attendance", icon: <Calendar size={18} /> },
  { label: "Events", icon: <Calendar size={18} /> },
  { label: "Messages", icon: <Mail size={18} /> },
  { label: "Announcements", icon: <Megaphone size={18} /> }
];

const otherItems = [
  { label: "Profile", icon: <User size={18} /> },
  { label: "Settings", icon: <Settings size={18} /> },
  { label: "Logout", icon: <LogOut size={18} /> }
];

const Navbar = () => {
  return (
    <div className="w-full bg-white border-r shadow-sm flex flex-col justify-between">
      <div>
        <div className="text-gray-500 text-xs font-semibold px-4 py-3 uppercase">Menu</div>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition">
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="text-gray-500 text-xs font-semibold px-4 py-3 uppercase">Other</div>
        <ul>
          {otherItems.map((item, index) => (
            <li key={index} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition">
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
