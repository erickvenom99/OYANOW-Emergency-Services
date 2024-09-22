import { useState } from "react";
import { Link, useNavigate, useParams, useLocation, Outlet } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import LiveTracking from "../ReusableComponents/LiveTracking/LiveTracking"; // Adjust the path as necessary
import "../../index.css";

interface Coordinates {
  lat: number;
  lng: number;
}

const Dashboard = () => {
  const uniqueUsername = useParams();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, coordinates, username, providerId } = location.state || {};

  const defaultCoordinates: Coordinates = { lat: 0, lng: 0 };
  let validCoordinates: Coordinates = defaultCoordinates;

  if (coordinates && coordinates.type === "Point" && Array.isArray(coordinates.coordinates)) {
    const coordArray = coordinates.coordinates;
    if (coordArray.length === 2) {
      validCoordinates = {
        lat: coordArray[1], // latitude
        lng: coordArray[0], // longitude
      };
    }
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
              <Link to={`/${username}/dashboard`} className="flex items-center w-full text-gray-300 no-underline">
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} ml-3`}>
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
              <Link to={`/${username}/dashboard/notifications`} className="flex items-center w-full text-gray-300 no-underline">
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} ml-3`}>
                  Notifications
                </span>
              </Link>
            </li>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
              <Link to="/job-listings" className="flex items-center w-full text-gray-300 no-underline">
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} ml-3`}>
                  Job Listing
                </span>
              </Link>
            </li>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
              <Link to={`/${username}/dashboard/reviews`} className="flex items-center w-full text-gray-300 no-underline">
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} ml-3`}>
                  Reviews
                </span>
              </Link>
            </li>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
              <Link to={`/${username}/dashboard/analytics`} className="flex items-center w-full text-gray-300 no-underline">
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} ml-3`}>
                  Analytics
                </span>
              </Link>
            </li>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
              <Link to={`/${username}/dashboard/profile`} className="flex items-center w-full text-gray-300 no-underline">
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} ml-3`}>
                  Profile
                </span>
              </Link>
            </li>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
              <Link to={`/${username}/dashboard/settings`} className="flex items-center w-full text-gray-300 no-underline">
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} ml-3`}>
                  Settings
                </span>
              </Link>
            </li>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
              <Link to="/logout" className="flex items-center w-full text-gray-300 no-underline">
                <span className="text-2xl">
                  <MdDashboard />
                </span>
                <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"} ml-3`}>
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-7 flex-1">
          <h1 className="text-2xl font-semibold">Service Provider Dashboard</h1>
          {orderId ? (
            <LiveTracking orderId={orderId} initialCoordinates={validCoordinates} />
          ) : coordinates ? (
            <LiveTracking orderId="" initialCoordinates={validCoordinates} />
          ) : (
            <p>No order or coordinates information available.</p>
          )}
          {/* Render the child route content */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;