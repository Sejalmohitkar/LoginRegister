import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultantData } from "../../Store/auththunk";
import {
  registerDoctor,
  deleteDoctor,
  updateDoctor,
} from "../../Store/docterConsutant/doctorThunk";
import Sidebar from "./Sidebar";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Consultant() {
  const dispatch = useDispatch();
  //get consultantdata
  const { consultant } = useSelector((state) => state.auth);
  
  //create from cosultant
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

  //view update 
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing consultant
        await dispatch(updateDoctor({ id: editingId, updatedData: formData })).unwrap();
        toast.success("Consultant updated successfully!");
      } else {
        // Register new consultant
        await dispatch(registerDoctor(formData)).unwrap();
        toast.success("Consultant created successfully!");
      }
  
      // Reset form after submit
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
      setIsEditing(false);
      setEditingId(null);
      dispatch(getConsultantData()); // Refresh consultant list
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error occurred, please try again!");
    }
  };
  

  const handleView = (item) => {
    setModalData(item);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setFormData({
      cIN: item.cIN || "",
      name: item.name || "",
      gender: item.gender || "",
      email: item.email || "",
      dateOfBirth: item.dateOfBirth || "",
      specialty: item.specialty || "",
      qualifications: item.qualifications || "",
      medicalLicenseNumber: item.medicalLicenseNumber || "",
      phoneNumber: item.phoneNumber || "",
      yearsOfExperience: item.yearsOfExperience || "",
      username: item.username || "",
      password: "", 
    });
    setShowForm(true);
    setIsEditing(true);
    setEditingId(item._id || item.id);
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this consultant?")) {
      try {
        await dispatch(deleteDoctor(id)).unwrap();
        toast.success("Consultant deleted successfully!");
        dispatch(getConsultantData()); 
      } catch (err) {
        toast.error("Error deleting consultant.");
        console.error("Delete error:", err);
      }
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
              {isEditing ? "Update" : "Create"}
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
                  "Date of Birth",
                  "Specialty",
                  "Qualifications",
                  "License No.",
                  "Experience (Years)",
                  "Contact",
                  "Username",
                  "Actions",
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
                  <td className="px-4 py-2 border">{item.specialty}</td>
                  <td className="px-4 py-2 border">{item.qualifications}</td>
                  <td className="px-4 py-2 border">
                    {item.medicalLicenseNumber}
                  </td>
                  <td className="px-4 py-2 border">{item.yearsOfExperience}</td>
                  <td className="px-4 py-2 border">
                    {item.email}
                    <span className="flex">{item.phoneNumber}</span>
                  </td>
                  <td className="px-4 py-2 border">{item.username}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleView(item)} title="View">
                        <FaEye className="text-blue-600 hover:text-blue-800" />
                      </button>
                      <button onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit className="text-green-600 hover:text-green-700" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id || item.id)}
                        title="Delete"
                      >
                        <FaTrash className="text-red-600 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {consultant?.length === 0 && (
                <tr>
                  <td colSpan="11" className="px-4 py-2 text-center border">
                    No consultant data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />

      {/* //view consultant data */}
      {showModal && modalData && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-100 relative">
            <h2 className="text-lg font-bold mb-2 text-center">
              Consultant Details
            </h2>
            <ul className="text-sm space-y-1">
              {Object.entries(modalData).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Consultant;
