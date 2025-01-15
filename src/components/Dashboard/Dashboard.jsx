import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Users } from "lucide-react";

//Importing the server url
import { SERVER_URL } from "../../services/api";

const Dashboard = () => {
  const [totalMembers, setTotalMembers] = useState(0); // State for total members
  const [activeMembers, setActiveMembers] = useState(0); // State for active members
  const [activeData, setActiveData] = useState([]); // State for active table data

  // Fetch data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total members
        const membersResponse = await fetch(`${SERVER_URL}/members`);
        if (!membersResponse.ok) {
          throw new Error("Failed to fetch total members");
        }
        const membersData = await membersResponse.json();
        setTotalMembers(membersData.members.length); // Set total members count

        // Fetch active members
        const paymentsResponse = await fetch(`${SERVER_URL}/payments`);
        if (!paymentsResponse.ok) {
          throw new Error("Failed to fetch active members");
        }
        const paymentsData = await paymentsResponse.json();
        const uniqueActiveMembers = new Set(
          paymentsData.map((payment) => payment.member_id)
        ); // Count unique member IDs in payments
        setActiveMembers(uniqueActiveMembers.size);

        // Fetch actives data
        const activesResponse = await fetch(`${SERVER_URL}/actives`);
        if (!activesResponse.ok) {
          throw new Error("Failed to fetch actives data");
        }
        const activesData = await activesResponse.json();
        setActiveData(activesData); // Set actives table data
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <div className="welcome-card">
        <h2>Welcome Back, TeeFlex Admin 👋</h2>
        <p>This is where you get all the summary</p>
      </div>

      <div className="metrics-container">
        {/* Total Members */}
        <div className="metric-card">
          <div className="metric-icon">
            <Users size={24} />
          </div>
          <div className="metric-content">
            <h3>Total Members</h3>
            <p>{totalMembers}</p>
          </div>
        </div>

        {/* Active Members */}
        <div className="metric-card">
          <div className="metric-icon">
            <Users size={24} />
          </div>
          <div className="metric-content">
            <h3>Active Members</h3>
            <p>{activeMembers}</p>
          </div>
        </div>
      </div>

      <div className="members-section">
        <h3>Active Members</h3>
        <div className="members-header">
          <input type="text" placeholder="Search" className="search-input" />
          <div className="sort-section">
            <span>Sort By</span>
            <div className="sort-headers">
              <span>Date Paid</span>
              <span>Expiry Date</span>
              <span>Status</span>
            </div>
          </div>
        </div>

        {/* Actives Table */}
        <div className="members-table">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Date Paid</th>
                <th>Expiry Date</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {activeData.map((active) => (
                <tr key={active.id}>
                  <td>{active.status ? "Active" : "Inactive"}</td>
                  <td>{new Date(active.date_paid).toLocaleDateString()}</td>
                  <td>{new Date(active.expiry_date).toLocaleDateString()}</td>
                  <td>{active.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;









































// import React from "react";
// import "./Dashboard.css";
// import { FaUserFriends, FaUsers } from "react-icons/fa";

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       {/* Welcome Card */}
//       <div className="welcome-card">
//         <h3>Welcome Back, Teflex Admin 👋</h3>
//         <p>This is where you get all the summary</p>
//       </div>

//       {/* Summary Cards */}
//       <div className="summary-cards">
//         <div className="card">
//           <FaUsers className="icon" />
//           <h4>Total Members</h4>
//           <p>50</p>
//         </div>
//         <div className="card">
//           <FaUserFriends className="icon" />
//           <h4>Active Members</h4>
//           <p>35</p>
//         </div>
//       </div>

//       {/* Active Members Table */}
//       <div className="active-members">
//         <h3>Active Members</h3>
//         <div className="table-header">
//           <button className="search-btn">Search</button>
//           <button className="sort-btn">Sort By</button>
//         </div>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Date Paid</th>
//               <th>Expiry Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Jane Doe</td>
//               <td>01/01/2025</td>
//               <td>01/01/2026</td>
//               <td>Active</td>
//             </tr>
//             <tr>
//               <td>John Doe</td>
//               <td>01/02/2025</td>
//               <td>01/02/2026</td>
//               <td>Active</td>
//             </tr>
//             <tr>
//               <td>Guido Van</td>
//               <td>01/03/2025</td>
//               <td>01/03/2026</td>
//               <td>Active</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
