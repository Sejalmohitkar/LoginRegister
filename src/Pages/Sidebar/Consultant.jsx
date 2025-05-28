import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultantData } from "../../Store/auththunk";
import {
  registerDoctor,
  deleteDoctor,
  updateDoctor,
  viewConsultant,
} from "../../Store/docterConsutant/doctorThunk";
import Sidebar from "./Sidebar";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { MdCancel} from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Consultant() {
  const dispatch = useDispatch();
  //get consultantdata
  const { consultant, ConsultantById } = useSelector((state) => state.auth);

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

  //view
  const [showViewModal, setShowViewModal] = useState(false);
  const [allConsultant, setAllConsultant] = useState([]);

  //update
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  //delete popup(delete cancel)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

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
        await dispatch(
          updateDoctor({ id: editingId, updatedData: formData })
        ).unwrap();
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

  useEffect(() => {
    dispatch(getConsultantData());
  }, [dispatch]);

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

  useEffect(() => {
    dispatch(getConsultantData());
  }, [dispatch]);

  //view
  const handleView = async (cIN) => {
    try {
      const result = await dispatch(viewConsultant(cIN)).unwrap();
      setAllConsultant(result);
      setShowViewModal(true);
    } catch (error) {
      console.error("View error:", error);
      toast.error("Failed to load consultant details.");
    }
  };

  useEffect(() => {
    if (ConsultantById) {
      setAllConsultant(ConsultantById);
    }
  }, [ConsultantById]);

  console.log(ConsultantById);

  //delete Department
  const handleDelete = (cIN) => {
    setSelectedDeleteId(cIN);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteDoctor(selectedDeleteId)).unwrap();
      toast.success("Consultant deleted successfully!");
      dispatch(getConsultantData());
    } catch (err) {
      console.log(err);
      toast.error("failed to delete Department");
    } finally {
      setShowDeleteConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  const inputClass = "border w-52 px-3 py-1 rounded-md";

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full p-2">
        <main className="flex flex-col p-6 overflow-auto">
          <div className="mb-1 relative text-end">
            <h2 className=" absolute mb-1 text-2xl font-bold text-gray-800 ">
              Consultant Details
            </h2>
            <button
              onClick={toggleForm}
              className="px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {showForm ? "Close" : "Create +"}
            </button>
          </div>
        </main>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg min-w-[700px] max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {isEditing ? "Update Doctor" : "Create Doctor"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
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
                <div className="col-span-1 md:col-span-2 flex gap-2 justify-end mt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white rounded-lg bg-green-600 rounded hover:bg-green-700"
                  >
                    {isEditing ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-red-500 rounded-lg text-white rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {[
                  "CIN",
                  "Name",
                  "Gender",
                  "DOB",
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
                      <button onClick={() => handleView(item.cIN)} title="View">
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

      {/* //view Department */}
      {showViewModal && allConsultant && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 mx-auto mt-20 bg-white shadow-xl rounded-xl">
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute text-xl font-bold text-red-600 top-3 right-3 hover:text-red-800"
            >
              ×
            </button>

            <h2 className="mb-4 text-2xl font-bold text-gray-800 ">
              Consultant Details
            </h2>
            <ul className="mb-4 space-y-2 text-sm">
              <li>
                <strong>cIN:</strong> {allConsultant[0].cIN}
              </li>
              <li>
                <strong>Name:</strong> {allConsultant[0].name}
              </li>
              <li>
                <strong>Gender:</strong> {allConsultant[0].gender}
              </li>
              <li>
                <strong>Email:</strong> {allConsultant[0].email}
              </li>
              <li>
                <strong>DOB:</strong> {allConsultant[0].dateOfBirth}
              </li>

              <li>
                <strong>Specialty:</strong> {allConsultant[0].specialty}
              </li>
              <li>
                <strong>Qualification:</strong>{" "}
                {allConsultant[0].qualifications}
              </li>
              <li>
                <strong>Medical Licence No:</strong>{" "}
                {allConsultant[0].medicalLicenseNumber}
              </li>
              <li>
                <strong>Phone:</strong> {allConsultant[0].phoneNumber}
              </li>
              <li>
                <strong>Experience (Years):</strong>{" "}
                {allConsultant[0].yearsOfExperience}
              </li>
              <li>
                <strong>Username:</strong> {allConsultant[0].username}
              </li>

              <li>
                <strong>Updated At:</strong> {allConsultant[0].updatedAt}
              </li>
              <li>
                <strong>Created At:</strong> {allConsultant[0].createdAt}
              </li>
            </ul>
          </div>
        </div>
      )}

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
  );
}

export default Consultant;
