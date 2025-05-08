import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallDepartment,
  registerDepartment,
  deleteDepartment,
  updateDepartment,
  viewDepartment,
} from "../../Store/docterConsutant/doctorThunk";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";

const Departments = () => {
  const dispatch = useDispatch();
  const { department, DepartmentdIN } = useSelector((state) => state.doctor);
  const [departmentData, SetDepartmentData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  //update Receptionist
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  //view Department
  const [opendata, setOpendata] = useState(false);
  const [alldepartment, setAlldepartment] = useState([]);

  //delete popup(delete cancle)


  const [formData, setFormData] = useState({
    dIN: "",
    name: "",
    description: "",
  });

  const toggleForm = () => setShowForm((prev) => !prev);

  useEffect(() => {
    dispatch(getallDepartment());
  }, [dispatch]);

  useEffect(() => {
    SetDepartmentData(department);
  }, [department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await dispatch(registerDepartment(formData)).unwrap();
  //     toast.success("Department created successfully!");
  //     setFormData({ dIN: "", name: "", description: "" });
  //     setShowForm(false);
  //     dispatch(getallDepartment());
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to create department.");
  //   }
  //   window.location.reload();
  // };

  //delete Department
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this consultant?")) {
      try {
        await dispatch(deleteDepartment(id)).unwrap();
        toast.success("Patient deleted successfully!");
        dispatch(getallDepartment());
      } catch (err) {
        toast.error("Error deleting consultant.");
        console.error("Delete error:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing consultant
        await dispatch(
          updateDepartment({ id: editingId, updatedData: formData })
        ).unwrap();
        toast.success("Department updated successfully!");
      } else {
        // Register new consultant
        await dispatch(registerDepartment(formData)).unwrap();
        toast.success("Department created successfully!");
      }

      // Reset form after submit
      setFormData({
        dIN: "",
        name: "",
        department: "",
      });
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
      dispatch(getallDepartment());
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error occurred, please try again!");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      dIN: item.dIN || "",
      name: item.name || "",
      department: item.department || "",
    });
    setShowForm(true);
    setIsEditing(true);
    setEditingId(item._id || item.id);
  };

  //view Department
  const handleview = async (dIN) => {
    try {
      await dispatch(viewDepartment(dIN)).unwrap();
      setOpendata(true);
    } catch (error) {
      console.error("view error:", error);
      toast.error("Failed to load department details.");
    }
  };

  useEffect(() => {
    if (DepartmentdIN) {
      setAlldepartment(DepartmentdIN[0]);
      setOpendata(false);
    }
  }, [DepartmentdIN]);
  console.log(DepartmentdIN);

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>

      <div className="flex flex-col w-full p-2">
        <main className="flex flex-col p-6 overflow-auto">
          <div className="mb-1 text-end">
            <button
              onClick={toggleForm}
              className="px-2 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {showForm ? "Close" : "Create +"}
            </button>
          </div>
        </main>

        {/* {status === "loading" && <p>Loading receptionists...</p>}
        {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>} */}

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-md shadow-lg p-6 min-w-[700px]  relative">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                {isEditing ? "Update Department" : "Create Department"}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="dIN"
                  name="dIN"
                  value={formData.dIN}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                /> 
                <div className="flex justify-end gap-3 mt-4 font-semibold md:col-span-2">
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  {isEditing ? "update" : "Create" }
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

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm  text-left border border-gray-300">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                {["dIN", "Name", "Description", "Action"].map((header) => (
                  <th key={header} className="px-4 py-2 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {departmentData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.dIN}</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.description}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center gap-2">
                      <button title="View" onClick={() => handleview(item.dIN)}>
                        <FaEye className="text-blue-600 hover:text-blue-800" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        title="Delete"
                      >
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

        {/* //view Department */}
        {opendata && alldepartment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded shadow-lg w-50">
              <h2 className="mb-4 text-xl font-semibold text-center">
                Departments Details
              </h2>
              <ul className="mb-4 space-y-2 text-sm">
                <li>
                  <strong>_id:</strong> {alldepartment._id}
                </li>
                <li>
                  <strong>dIN:</strong> {alldepartment.dIN}
                </li>
                <li>
                  <strong>Name:</strong> {alldepartment.name}
                </li>
                <li>
                  <strong>Description:</strong> {alldepartment.description}
                </li>
                <li>
                  <strong>_createdAt:</strong> {alldepartment.createdAt}
                </li>
                <li>
                  <strong>_updatedAt:</strong> {alldepartment.updatedAt}
                </li>
              </ul>
              <button
                onClick={() => setOpendata(false)}
                className=" w-full px-4 mt-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;
