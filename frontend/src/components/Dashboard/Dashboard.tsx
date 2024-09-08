import { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import LiveTracking from "../ReusableComponents/LiveTracking/LiveTracking"; // Adjust the path as necessary
import "../../index.css";
import "./Dashboard.css";

const Dashboard = () => {
  const { username } = useParams();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const {orderId, coordinates} = location.state || {};
  
  // Sample order ID, replace this with actual data


  const handleClick = () => {
    const destinationPath = '/' + username + '/dashboard/notifications';
    navigate(destinationPath);
  }

  return (
    <>
      <div className="flex">
        <div className={`bg-purple-700 h-screen p-3 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
          <BsArrowLeftShort
            className={`bg-white text-purple-700 text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex items-center">
            <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer mr-2 duration-500 ${open && "rotate-[360deg]"}`} />
            <h1 className={`text-white font-medium text-2xl duration-300 ${!open && "scale-0"}`}>
              {`WELCOME, ${username}`}
            </h1>
          </div>

          {/* Navigation Links */}
          <ul className="pt-2 p-0">
          <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
          <span className="text-2xl">
            <MdDashboard />
          </span>
          <span
            className={`text-base font-medium flex-1 duration-200 ${
              !open && "hidden"
            }`}
          >
            Dashboard
          </span>
        </li>
            <li onClick={handleClick} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
              <span className="text-2xl"><MdDashboard /></span>
              <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>Notifications</span>
            </li>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
          <Link
            to="/job-listings"
            className="flex items-center w-full text-gray-300 no-underline"
          >
            <span className="text-2xl">
              <MdDashboard />
            </span>
            <span
              className={`text-base font-medium flex-1 duration-200 ${
                !open && "hidden"
              } ml-3`}
            >
              Job Listing
            </span>
          </Link>
        </li>
        <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
          <span className="text-2xl">
            <MdDashboard />
          </span>
          <span
            className={`text-base font-medium flex-1 duration-200 ${
              !open && "hidden"
            }`}
          >
            Reviews
          </span>
        </li>
        <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
          <span className="text-2xl">
            <MdDashboard />
          </span>
          <span
            className={`text-base font-medium flex-1 duration-200 ${
              !open && "hidden"
            }`}
          >
            Analytics
          </span>
        </li>
        <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
          <span className="text-2xl">
            <MdDashboard />
          </span>
          <span
            className={`text-base font-medium flex-1 duration-200 ${
              !open && "hidden"
            }`}
          >
            Profile
          </span>
        </li>
        <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
          <span className="text-2xl">
            <MdDashboard />
          </span>
          <span
            className={`text-base font-medium flex-1 duration-200 ${
              !open && "hidden"
            }`}
          >
            Settings
          </span>
        </li>
        <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
          <span className="text-2xl">
            <MdDashboard />
          </span>
          <span
            className={`text-base font-medium flex-1 duration-200 ${
              !open && "hidden"
            }`}
          >
            Logout
          </span>
        </li>
          </ul>
        </div>
        <div className="p-7 flex-1">
          <h1 className="text-2xl font-semibold">Service Provider Dashboard</h1>
          {orderId ? (
            <LiveTracking orderId={orderId} initialCoordinates={coordinates!} />
          ) : (
            coordinates ? (
              <LiveTracking orderId={""} initialCoordinates={coordinates} />
            ) : (
              <p>No order or coordinates information available.</p>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;