import React, {useState} from 'react';
import Sidebar from './Sidebar';

const Departments = () => {

  const [showForm, setShowForm] = useState(false);
  
  const toggleForm = () => setShowForm((prev) => !prev);

  return (
     <div className='flex'>
            <div>
                <Sidebar/>
            </div>

            <div className='flex flex-col w-full p-2'>
      <main className='flex flex-col p-6 overflow-auto'>
        <div className='mb-1 text-end'>
          <button 
          onClick={toggleForm}
          className='px-2 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700'
          >
           {showForm ? "Close" : "Create +"}
          </button>
        </div>
      </main>
      

        {showForm && (
          <form className="absolute right-0 z-10 grid grid-cols-1 gap-4 p-4 mb-6 mt-20 bg-gray-300 rounded-md shadow md:grid-cols-2 text-end">
            <input type="text" placeholder="CIN" className="p-2 border rounded" />
            <input type="text" placeholder="Name" className="p-2 border rounded" />
            <input type="text" placeholder="Username" className="p-2 border rounded" />
            <input type="email" placeholder="Email" className="p-2 border rounded" />
            <input type="text" placeholder="Phone Number" className="p-2 border rounded" />
            <select className="p-2 border rounded">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="female">Other</option>

            </select>
            <input type="number" placeholder="medicalLicenceNumber" className="p-2 border rounded" />
            <input type="date" placeholder="DOB" className="p-2 border rounded" />
            <input type="text" placeholder="Qualification" className="p-2 border rounded" />
            <input type="number" placeholder="Years of Experience" className="p-2 border rounded" />
            <button
              type="submit"
              className="w-1/2 col-span-1 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 md:col-span-2"
            >
              Submit
            </button>
          </form>
        )}


      <div className="relative overflow-x-auto">
        <table className="w-full text-sm  text-left border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">CIN</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">DateOfBirth</th>
              <th className="px-4 py-2 border">Specialty</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">phoneNumber</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {/* {consultantsdata.map((item,index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{item.cIN}</td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.gender}</td>
                <td className="px-4 py-2 border">{item.dataOfBirth}</td>
                <td className="px-4 py-2 border text-center">{item.specialty}</td>
                <td className="px-4 py-2 border">{item.address}</td>
                <td className="px-4 py-2 border">{item.phoneNumber}</td>
                <td className="px-4 py-2 border">{item.username}</td>
                <td className="px-4 py-2 border">{item.email}</td>
              </tr>
            )
            )} */}
          </tbody>
        </table>
      </div>
      </div>
          
        </div>
  )
}

export default Departments;



