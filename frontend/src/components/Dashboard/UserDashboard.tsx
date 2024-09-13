import { useLocation } from "react-router-dom"
import { useState } from "react";

const UserDashboard = () => {
  const location = useLocation();
  const { username } = location.state || {};

  const [activeService, setActiveService] = useState<string | null>(null);

  // Define services type
  type Services = {
    [key: string]: string[];
  };

  const services: Services = {
    Mechanic: ["Mechanic A", "Mechanic B", "Mechanic C"],
    Plumber: ["Plumber A", "Plumber B"],
    Electrician: ["Electrician A", "Electrician B", "Electrician C"]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto p-3">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {username}!</h2>

        {/* Service Quick Access Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button className="bg-blue-500 text-white p-3 rounded shadow-lg hover:bg-blue-600">
            Request Mechanic
          </button>
          <button className="bg-green-500 text-white p-3 rounded shadow-lg hover:bg-green-600">
            Request Plumber
          </button>
          <button className="bg-yellow-500 text-white p-3 rounded shadow-lg hover:bg-yellow-600">
            Request Electrician
          </button>
        </div>
        {/* Active Requests */}
        <section className="bg-white p-4 rounded shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-2">Active Requests:</h3>
          <ul>
            <li className="border-b py-2 flex justify-between">
              <span>Mechanic: Pending</span>
              <button className="text-red-500">Cancel</button>
            </li>
            <li className="border-b py-2 flex justify-between">
              <span>Plumber: In Progress</span>
              <button className="text-red-500">Cancel</button>
            </li>
          </ul>
        </section>

        {/* Emergency Tips */}
        <section className="bg-white p-4 rounded shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-2">Emergency Tips:</h3>
          <ul>
            <li>Check oil level before calling a mechanic.</li>
            <li>Use towels to manage leaks temporarily.</li>
          </ul>
        </section>

        {/* Recent Activity Log */}
        <section className="bg-white p-4 rounded shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-2">Recent Activity:</h3>
          <ul>
            <li>Request for Plumber completed.</li>
            <li>Mechanic request initiated.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
