import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultantData } from "../../Store/auththunk";
import { registerDoctor } from "../../Store/docterConsutant/doctorThunk";
import Sidebar from "./Sidebar";

function Dashboard() {
  const dispatch = useDispatch();
  const { consultant } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    cIN: "",
    name: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    specialty: "",
    qualifications: "",
    medicalLicenseNumber: "",
    phoneNumber: "",
    yearsOfExperience: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerDoctor(formData)).unwrap();
      setFormData({
        cIN: "",
        name: "",
        gender: "",
        email: "",
        dateOfBirth: "",
        specialty: "",
        qualifications: "",
        medicalLicenseNumber: "",
        phoneNumber: "",
        yearsOfExperience: "",
        username: "",
        password: "",
      });
      setShowForm(false);
      dispatch(getConsultantData()); // Refresh consultant list
    } catch (err) {
      console.error("Error registering doctor:", err);
    }
  };

  useEffect(() => {
    dispatch(getConsultantData());
  }, [dispatch]);

  const inputClass = "border w-52 px-3 py-1 rounded-md";

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col w-full p-2">
        <main className="flex flex-col p-6 overflow-auto">
          <div className="mb-1 text-end">
            <button
              onClick={toggleForm}
              className="px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {showForm ? "Close" : "Create +"}
            </button>
          </div>
        </main>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="absolute right-0 z-10 grid grid-cols-1 gap-4 p-4 mb-6 mt-20 bg-gray-300 rounded-md shadow md:grid-cols-2"
          >
            <input
              type="text"
              name="cIN"
              value={formData.cIN}
              placeholder="CIN"
              onChange={handleInputChange}
              className={inputClass}
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleInputChange}
              className={inputClass}
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleInputChange}
              className={inputClass}
            />
            <input
              type="text"
              name="gender"
              value={formData.gender}
              placeholder="Gender"
              onChange={handleInputChange}
              className={inputClass}
              list="genders"
            />
            <datalist id="genders">
              <option value="Male" />
              <option value="Female" />
              <option value="Other" />
            </datalist>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={inputClass}
            />
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              placeholder="Specialty"
              onChange={handleInputChange}
              className={inputClass}
            />
            <input
              type="text"
              name="medicalLicenseNumber"
              value={formData.medicalLicenseNumber}
              placeholder="Medical License Number"
              onChange={handleInputChange}
              className={inputClass}
            />
            <input
              type="text"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              placeholder="Years of Experience"
              onChange={handleInputChange}
              className={inputClass}
            />
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Phone Number"
              onChange={handleInputChange}
              className={inputClass}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleInputChange}
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleInputChange}
              className={inputClass}
            />
            <input
              type="text"
              name="qualifications"
              value={formData.qualifications}
              placeholder="Qualifications"
              onChange={handleInputChange}
              className={inputClass}
            />
            <button
              type="submit"
              className="w-full col-span-1 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 md:col-span-2"
            >
              Create
            </button>
          </form>
        )}

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {[
                  "CIN",
                  "Name",
                  "Gender",
                  "Date Of Birth",
                  "Specialty",
                  "Address",
                  "Phone Number",
                  "Username",
                  "Email",
                ].map((header) => (
                  <th key={header} className="px-4 py-2 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {consultant?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.cIN}</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.gender}</td>
                  <td className="px-4 py-2 border">{item.dateOfBirth}</td>
                  <td className="px-4 py-2 border text-center">
                    {item.specialty}
                  </td>
                  <td className="px-4 py-2 border">{item.address}</td>
                  <td className="px-4 py-2 border">{item.phoneNumber}</td>
                  <td className="px-4 py-2 border">{item.username}</td>
                  <td className="px-4 py-2 border">{item.email}</td>
                </tr>
              ))}
              {consultant?.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-4 py-2 text-center border">
                    No consultant data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
