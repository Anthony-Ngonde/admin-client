import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import { Users, Bell } from 'lucide-react';

// Importing the server URL
import { SERVER_URL } from '../../services/api';
import Table from './Table';

const Dashboard = () => {

  //State to manage the total members we have
  const [totalMembers, setTotalMembers] = useState([]);
  console.log(totalMembers);

  //State to manage the total active members
  const [activeMembers, setActiveMembers] = useState([]);
  console.log(activeMembers);


  // const [activeData, setActiveData] = useState([]);
  // console.log(activeData);

  //State to manage the notifications
  const [notifications, setNotifications] = useState([]);

  //State to manage opening and closing of the notifications modal
  const [showNotifications, setShowNotifications] = useState(false);

  //State to manage loading when still fetching data
  const [isLoading, setIsLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        
        //To await the response from the server
        const membersResponse = await fetch(`${SERVER_URL}/members`);

        //Condition to check if the response from the server was a 200 or ok
        if (!membersResponse.ok)
          throw new Error('Failed to fetch total members');

        //If everything is ok we then pass in the members data from the backend 
        const membersData = await membersResponse.json();
        console.log(membersData);
        setTotalMembers(membersData.members);

        //Fetching the payments here too
        // const paymentsResponse = await fetch(`${SERVER_URL}/payments`);

        //Condition to check the response from the server
        // if (!paymentsResponse.ok)
        //   throw new Error('Failed to fetch active members');

        //Pass in the data of the payments here
        //TODO --> Check this logic
        // const paymentsData = await paymentsResponse.json();
        // const uniqueActiveMembers = new Set(
        //   paymentsData.map((payment) => payment.member_id)
        // );
        // setActiveMembers(uniqueActiveMembers.size);

        //Fetching the active members
        const activesResponse = await fetch(`${SERVER_URL}/actives`);

        //Checking if server response is ok
        if (!activesResponse.ok)
          throw new Error('Failed to fetch actives data');

        //We then pass in the active members data
        const activesData = await activesResponse.json();
        setActiveMembers(activesData.active);

        await fetchNotifications();
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
    const intervalId = setInterval(fetchNotifications, 10000);

    return () => clearInterval(intervalId);
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/notifications`);
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const notificationsData = await response.json();
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Pagination logic
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = activeMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  console.log(currentMembers);
  const totalPages = Math.ceil(activeMembers.length / membersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="welcome-card">
        <h2>Welcome Back, TeeFlex Admin 👋</h2>
        <p>This is where you get all the summary</p>
        <div
          className="notification-bell"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={24} />
          {notifications.some((n) => !n.is_read) && (
            <span className="notification-dot" />
          )}
        </div>
        {showNotifications && (
          <div className="notifications-dropdown">
            {isLoading ? (
              <p>Loading...</p>
            ) : notifications.length === 0 ? (
              <p>No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <small>
                    {new Date(notification.created_at).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="metrics-container">
        <div className="metric-card">
          <div className="metric-icon">
            <Users size={24} />
          </div>
          <div className="metric-content">
            <h3>Total Members</h3>
            <p>{totalMembers.length}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <Users size={24} />
          </div>
          <div className="metric-content">
            <h3>Active Members</h3>
            <p>{activeMembers.length}</p>
          </div>
        </div>
      </div>
<Table currentMembers={currentMembers} totalPages={totalPages} paginate={paginate} currentPage={currentPage}/>
      {/* <div className="members-section">
        <h3>Active Members</h3>
        <div className="members-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Date Paid</th>
                <th>Expiry Date</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {currentMembers.map((active) => (
                <tr key={active.id}>
                  <td>{active.name}</td>
                  <td>{active.status ? 'Active' : 'Expired'}</td>
                  <td>{new Date(active.date_paid).toLocaleDateString()}</td>
                  <td>{new Date(active.expiry_date).toLocaleDateString()}</td>
                  <td>{active.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${
                  currentPage === page ? 'active' : ''
                }`}
                onClick={() => paginate(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
