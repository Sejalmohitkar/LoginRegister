import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Stethoscope,
  // Calendar,
  ClipboardList,
  Building,
  // LogIn,
  // AlertCircle,
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { to: "/consultant", label: "Consultants", icon: <Stethoscope size={20} /> },
  { to: "/patient", label: "Patients", icon: <Users size={20} /> },
  { to: "/receptionists", label: "Receptionists", icon: <ClipboardList size={20} /> },
  // { to: "/appointments", label: "Appointments", icon: <Calendar size={20} /> },
  // { to: "/patientdetail", label: "Patient Details", icon: <ClipboardList size={20} /> },
  { to: "/department", label: "Departments", icon: <Building size={20} /> },
  // { to: "/", label: "Login", icon: <LogIn size={20} /> },
  // { to: "/notfound", label: "Not Found", icon: <AlertCircle size={20} /> },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-[100vh] w-64 bg-[#0f172a] text-white z-30 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        <div className="p-4 flex flex-col h-full">
          <h1 className="text-white text-center font-bold text-2xl mb-6 tracking-wide">
            DoctorHub
          </h1>
          <nav className="flex-1 space-y-2">
            {links.map(({ to, label, icon }) => (
              <SidebarLink
                key={to}
                to={to}
                label={label}
                icon={icon}
                active={location.pathname === to}
                onClick={closeSidebar}
              />
            ))}
          </nav>
          <p className="text-center text-xs text-gray-400 mt-6">
            © 2025 DoctorHub
          </p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1">
        {/* Toggle Button for Mobile */}
        <div className="p-4 md:hidden">
          <button onClick={toggleSidebar} aria-label="Toggle sidebar">
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Main content slot (You inject your pages here) */}
        {/* Example:
        <main className="p-6">
          {children}
        </main>
        */}
      </div>
    </div>
  );
};

const SidebarLink = ({ to, label, icon, active, onClick }) => (
  <Link to={to} onClick={onClick} className="block">
    <div
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg mx-2 transition-all ${
        active
          ? "bg-blue-600 text-white shadow"
          : "hover:bg-gray-700 hover:text-white text-gray-300"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  </Link>
);

export default Sidebar;
