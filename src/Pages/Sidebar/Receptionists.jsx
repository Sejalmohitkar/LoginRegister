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

  //delete popup(delete cancel)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

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
  //delete Department
  const handleDelete = (dIN) => {
    setSelectedDeleteId(dIN);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteReception(selectedDeleteId)).unwrap();
      toast.success("Consultant deleted successfully!");
      dispatch(getallreception());
    } catch (err) {
      console.log(err);
      toast.error("failed to delete Department");
    } finally {
      setShowDeleteConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  const inputClass = "p-2 border rounded";

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full p-4">
        <main className="flex flex-col p-6 overflow-auto">
          <div className="mb-1 text-end">
            <h2 className=" absolute mb-1 text-2xl font-bold text-gray-800 ">
              Receptionist Details
            </h2>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-md shadow-lg p-6 min-w-[650px]  relative">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {isEditing ? "Update Department" : "Create Department"}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                <div className="flex justify-end gap-3 mt-4 font-semibold md:col-span-2">
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    {isEditing ? "update" : "Create"}
                  </button>

                  <button
                    type="button"
                    onClick={toggleForm}
                    className="px-6 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* handle Receptionist View */}
        {open && RecetionById && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 mx-auto mt-20 bg-white shadow-xl rounded-xl">
              <button
                onClick={() => setOpen(false)}
                className="absolute text-xl font-bold text-red-600 top-3 right-3 hover:text-red-800"
              >
                ×
              </button>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Receptionist Details
              </h2>
              {Object.entries(RecetionById).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
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

        {/* delete Function */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-5">
            <div className="p-6 bg-white rounded shadow-lg min-w-[350px]">
              <h2 className="mb-4 text-lg font-semibold text-center">
                Are you sure you want to delete this Department?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Receptionist;
