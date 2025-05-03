import React, {useState } from "react";
// import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  // const [username, setUsername] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // useEffect(() => {
  //   const user = localStorage.getItem('currentUser');
  //   if (user) {
  //     try {
  //       const parsed = JSON.parse(user); // Proper decoding
  //       const decoded = jwtDecode(parsed.token || parsed); // Adjust for raw token or user object
  //       setUsername(decoded?.username || "Unknown");
  //     } catch (err) {
  //       console.error("Invalid token:", err);
  //     }
  //   }
  // }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-[100vh] w-64 bg-black z-30 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
      >
        <div className="p-4">
          <h1 className="text-white text-center font-bold text-3xl mt-6">DoctorHub</h1>
          <nav className="flex flex-col items-center mt-6 space-y-4">
            <SidebarLink to="/dashboard" label="Dashboard" onClick={closeSidebar} />
            <SidebarLink to="/patient" label="Patients" onClick={closeSidebar} />
            <SidebarLink to="/receptionists" label="Receptionists" onClick={closeSidebar} />
            <SidebarLink to="/appointments" label="Appointments" onClick={closeSidebar} />
            <SidebarLink to="/patientdetail" label="Patient Details" onClick={closeSidebar} />
            <SidebarLink to="/department" label="Departments" onClick={closeSidebar} />
            <SidebarLink to="/" label="Login" onClick={closeSidebar} />
            <SidebarLink to="/notfound" label="Not Found" onClick={closeSidebar} />
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Toggle Button for Mobile */}
        <div className="p-4 md:hidden">
          <button onClick={toggleSidebar} aria-label="Toggle sidebar">
            
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* <main className="p-6 md:ml-64">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Dashboard</h1>
          <p className="text-lg mb-2">Welcome to the DoctorHub dashboard!</p>
          <p className="text-gray-700 text-md">
            Logged in as: <span className="font-semibold">{username}</span>
          </p>
        </main> */}
      </div>
    </div>
  );
};

const SidebarLink = ({ to, label, onClick }) => (
  <Link to={to} onClick={onClick} className="w-11/12">
    <button className="w-full px-4 py-2 text-white text-lg rounded-xl transition hover:bg-blue-500">
      {label}
    </button>
  </Link>
);

export default Sidebar;
