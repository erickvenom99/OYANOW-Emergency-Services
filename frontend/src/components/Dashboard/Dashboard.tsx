import { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [status, setStatus] = useState("Available");

  const handleToggle = () => {};
  return (
    <>
      <div className="container-dashboard">
        <div className="side-pane">
          <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>Requests</li>
            <li>Earnings</li>
          </ul>
        </div>
        <div className="content">
          <div className="db-heading">
            <h1>Dashboard</h1>
            <div className="profile-info">
              <h6>
                &lt;Username&gt; <img src="any-source" />
              </h6>
              <h5>
                Status <button>Available</button>
                <button>Busy</button>
              </h5>
            </div>
          </div>
          <hr />
          <div className="sp-orders">
            <h5>Total Orders</h5>
            <h5>Completed Orders</h5>
            <h5>Cancelled Orders</h5>
            <h5>Order History</h5>
          </div>
          <hr />
          <h3>Rating</h3>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
