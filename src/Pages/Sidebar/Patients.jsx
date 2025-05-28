import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallPatient,
  registerPatient,
  deletePatient,
  updatePatients,
  viewPatient,
} from "../../Store/docterConsutant/doctorThunk";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";

function Patients() {
  const dispatch = useDispatch();
  const { Patient, status, error, PatientById } = useSelector(
    (state) => state.doctor
  );
  const [patientData, setPatientData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  //update Receptionist
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  //view Patient
  const [opendata, setOpendata] = useState(false);
  const [allpatient, setAllpatient] = useState([]);

  //delete popup(delete cancel)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  // get Reception data
  useEffect(() => {
    dispatch(getallPatient());
  }, [dispatch]);

  useEffect(() => {
    setPatientData(Patient);
  }, [Patient]);

  const toggleForm = () => setShowForm(!showForm);

  const [formData, setFormData] = useState({
    pIN: "",
    name: "",
    sex: "",
    dob: "",
    address: "",
    personal_ph_no: "",
    patienttype: "",
    password: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing consultant
        await dispatch(
          updatePatients({ id: editingId, updatedData: formData })
        ).unwrap();
        toast.success("Patient updated successfully!");
      } else {
        // Register new consultant
        await dispatch(registerPatient(formData)).unwrap();
        toast.success("Patient created successfully!");
      }

      // Reset form after submit
      setFormData({
        pIN: "",
        name: "",
        sex: "",
        dob: "",
        address: "",
        personal_ph_no: "",
        patienttype: "",
        password: "",
        age: "",
      });
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
      dispatch(getallPatient());
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error occurred, please try again!");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      pIN: item.pIN || "",
      name: item.name || "",
      sex: item.sex || "",
      dob: item.dob || "",
      address: item.address || "",
      personal_ph_no: item.personal_ph_no || "",
      patienttype: item.patienttype || "",
      password: item.password || "",
      age: item.age || "",
    });
    setShowForm(true);
    setIsEditing(true);
    setEditingId(item._id || item.id);
  };

  //delete Department
  const handleDelete = (pIN) => {
    setSelectedDeleteId(pIN);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deletePatient(selectedDeleteId)).unwrap();
      toast.success("Consultant deleted successfully!");
      dispatch(getallPatient());
    } catch (err) {
      console.log(err);
      toast.error("failed to delete Department");
    } finally {
      setShowDeleteConfirm(false);
      setSelectedDeleteId(null);
    }
  };

  //view
  const handleView = async (pIN) => {
    try {
      await dispatch(viewPatient(pIN)).unwrap();
      setOpendata(true);
    } catch (error) {
      console.error("view error:", error);
      toast.error("Failed to load department details.");
    }
  };

  useEffect(() => {
    if (PatientById) {
      setAllpatient(PatientById[0]);
      setOpendata(false);
    }
  }, [PatientById]);
  console.log(PatientById);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full p-4">
        <main className="flex flex-col p-6 overflow-auto">
          <div className="mb-1 text-end">
            <h2 className=" absolute mb-1 text-2xl font-bold text-gray-800 ">
               Patients Details
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
                  name="pIN"
                  value={formData.pIN}
                  onChange={handleChange}
                  placeholder="pIN"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="p-2 border rounded"
                />
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="p-2 border rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Female">others</option>
                </select>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="personal_ph_no"
                  value={formData.personal_ph_no}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="patienttype"
                  value={formData.patienttype}
                  onChange={handleChange}
                  placeholder="Patient Type"
                  className="p-2 border rounded"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="p-2 border rounded"
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

        <div className="relative mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-300">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                {[
                  "pIN",
                  "name",
                  "Gender",
                  "dob",
                  "address",
                  "personal_ph_no",
                  "patienttype",
                  "age",
                  "Action",
                ].map((header) => (
                  <th key={header} className="px-4 py-2 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patientData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.pIN}</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.sex}</td>
                  <td className="px-4 py-2 border">{item.dob}</td>
                  <td className="px-4 py-2 border">{item.address}</td>
                  <td className="px-4 py-2 border">{item.personal_ph_no}</td>
                  <td className="px-4 py-2 border">{item.patienttype}</td>
                  <td className="px-4 py-2 border">{item.age}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center gap-2">
                      <button title="View" onClick={() => handleView(item.pIN)}>
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
        {/* //view Department */}
        {opendata && allpatient && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 mx-auto mt-20 bg-white shadow-xl rounded-xl">
              <button
                onClick={() => setOpendata(false)}
                className="absolute text-xl font-bold text-red-600 top-3 right-3 hover:text-red-800"
              >
                ×
              </button>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Patients Detail
              </h2>
              <ul className="mb-4 space-y-2 text-sm">
                <li>
                  <strong>_id:</strong> {allpatient._id}
                </li>
                <li>
                  <strong>pIN:</strong> {allpatient.pIN}
                </li>
                <li>
                  <strong>Name:</strong> {allpatient.name}
                </li>
                <li>
                  <strong>Gender:</strong> {allpatient.sex}
                </li>
                <li>
                  <strong>DOB:</strong> {allpatient.dob}
                </li>
                <li>
                  <strong>Address:</strong> {allpatient.address}
                </li>
                <li>
                  <strong>personal_ph_no:</strong> {allpatient.personal_ph_no}
                </li>
                <li>
                  <strong>patienttype:</strong> {allpatient.patienttype}
                </li>
                <li>
                  <strong>Age:</strong> {allpatient.age}
                </li>
                <li>
                  <strong>_createdAt:</strong> {allpatient.createdAt}
                </li>
                <li>
                  <strong>_updatedAt:</strong> {allpatient.updatedAt}
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
    </div>
  );
}

export default Patients;
