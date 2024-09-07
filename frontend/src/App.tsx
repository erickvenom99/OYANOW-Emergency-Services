import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SigninSignup from "./components/Serviceprovider/SigninSignup";
import Footer from "./components/ReusableComponents/Footer/Footer";
import Navbar from "./components/ReusableComponents/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import JobListings from "./components/JobListings";

const App = () => {
  // Define static job data
  const jobs = [
    {
      _id: "1",
      title: "Emergency Response Technician",
      description: "Provide emergency medical assistance and support.",
      location: "New York, NY",
      urgency: "High",
      status: "Open",
      client: { name: "City Hospital", contact: "123-456-7890" },
      scheduledTime: "2024-09-10T14:00:00Z",
      payment: { rate: "Hourly", method: "Cash" },
    },
    {
      _id: "2",
      title: "Paramedic",
      description: "Respond to emergency calls and provide care.",
      location: "Los Angeles, CA",
      urgency: "Medium",
      status: "Open",
      client: { name: "LA Health Services", contact: "987-654-3210" },
      scheduledTime: "2024-09-11T10:00:00Z",
      payment: { rate: "Per Call", method: "Credit Card" },
    },
  ];

  // Dummy function to simulate updating job status
  const updateJobStatus = (id: string, status: string) => {
    console.log(`Job ID: ${id} updated to status: ${status}`);
    // You can include logic here to update the job status in your state if needed
  };

  return (
    <div>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/service-providers/login" element={<SigninSignup />} />
          <Route path="/service-providers/sign-up" element={<SigninSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/job-listings"
            element={
              <JobListings jobs={jobs} onUpdateStatus={updateJobStatus} />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
