import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallreception,
  registerReception,
  deleteReception,
  viewReception,
  updateReception,
} from "../../Store/docterConsutant/doctorThunk";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";

function Receptionist() {
  const dispatch = useDispatch();
  const { Reception, status, error, RecetionById } = useSelector(
    (state) => state.doctor
  );
  const [receptionData, setReceptionData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  //update Receptionist
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // handle view
  const [open, setOpen] = useState(false);

  const handleView = async (id) => {
    try {
      await dispatch(viewReception(id)).unwrap();
      setOpen(true);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to load Receptionist details");
    }
  };

  // get Reception data
  useEffect(() => {
    dispatch(getallreception());
  }, [dispatch]);

  useEffect(() => {
    setReceptionData(Reception);
  }, [Reception]);

  const toggleForm = () => setShowForm(!showForm);

  const [formData, setFormData] = useState({
    rID: "",
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing consultant
        await dispatch(
          updateReception({ id: editingId, updatedData: formData })
        ).unwrap();
        toast.success("Consultant updated successfully!");
      } else {
        // Register new consultant
        await dispatch(registerReception(formData)).unwrap();
        toast.success("Consultant created successfully!");
      }

      // Reset form after submit
      setFormData({
        rID: "",
        name: "",
        username: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        password: "",
      });
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
      dispatch(getallreception()); // Refresh consultant list
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error occurred, please try again!");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      rID: item.rID || "",
      name: item.name || "",
      username: item.username || "",
      email: item.email || "",
      phoneNumber: item.phoneNumber || "",
      gender: item.gender || "",
      dateOfBirth: item.dateOfBirth || "",
      password: "",
    });
    setShowForm(true);
    setIsEditing(true);
    setEditingId(item._id || item.id);
  };

  // handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this consultant?")) {
      try {
        await dispatch(deleteReception(id)).unwrap();
        toast.success("Consultant deleted successfully!");
        dispatch(getallreception());
      } catch (err) {
        toast.error("Error deleting consultant.");
        console.error("Delete error:", err);
      }
    }
  };

  const inputClass = "border w-52 px-3 py-1 rounded-md";

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full p-4">
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

        {status === "loading" && <p>Loading receptionists...</p>}
        {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="absolute right-0 z-10 grid grid-cols-1 gap-4 p-4 mb-6 mt-20 bg-gray-300 rounded-md shadow md:grid-cols-2"
          >
            <input
              type="text"
              name="rID"
              value={formData.rID}
              placeholder="rID"
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
              name="username"
              value={formData.username}
              placeholder="Username"
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
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Phone Number"
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
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
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

        {/* handle Receptionist View */}
        {open && RecetionById && (
          <div className="bg-slate-100  shadow-2xl z-30 rounded-md ms-10 absolute mt-36 right-96 p-4">
            {Object.entries(RecetionById).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
            <button
              onClick={() => setOpen(false)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        )}

        <div className="relative mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-300">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                {[
                  "rID",
                  "Name",
                  "Email",
                  "Phone",
                  "Username",
                  "Gender",
                  "DOB",
                  "Action",
                ].map((header) => (
                  <th key={header} className="px-4 py-2 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {receptionData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.rID}</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.email}</td>
                  <td className="px-4 py-2 border">{item.phoneNumber}</td>
                  <td className="px-4 py-2 border">{item.username}</td>
                  <td className="px-4 py-2 border">{item.gender}</td>
                  <td className="px-4 py-2 border">{item.dateOfBirth}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center gap-2">
                      <button title="View" onClick={() => handleView(item.rID)}>
                        <FaEye className="text-blue-600 hover:text-blue-800" />
                      </button>
                      <button onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit className="text-green-600 hover:text-green-700" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        title="Delete"
                      >
                        <FaTrash className="text-red-600 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Receptionist;
