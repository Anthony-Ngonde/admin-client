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

  //State to manage the total active members
  const [activeMembers, setActiveMembers] = useState([]);

  //State for getting the full name of the admin
  //TODO --> To refactor this code to be more less
  const [fullName, setFullName] = useState([]);
  const firstName = fullName.first_name;

  const lastName = fullName.last_name;

  const userName = `${firstName} ${lastName}`;

  const email = fullName.email;

  //State to manage the notifications
  const [notifications, setNotifications] = useState([]);

  //State to manage opening and closing of the notifications modal
  const [showNotifications, setShowNotifications] = useState(false);

  //State to manage loading when still fetching data
  const [isLoading, setIsLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');

      try {
        //To await the response from the server
        const membersResponse = await fetch(`${SERVER_URL}/members`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        //Condition to check if the response from the server was a 200 or ok
        if (!membersResponse.ok)
          throw new Error('Failed to fetch total members');

        //If everything is ok we then pass in the members data from the backend
        const membersData = await membersResponse.json();

        setTotalMembers(membersData.members);

        const activesResponse = await fetch(`${SERVER_URL}/actives`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        //Checking if server response is ok
        if (!activesResponse.ok)
          throw new Error('Failed to fetch actives data');

        //We then pass in the active members data
        const activesData = await activesResponse.json();
        setActiveMembers(activesData.active);

        //Fetching the full name of the admin
        const namesResponse = await fetch(`${SERVER_URL}/admin/name`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!namesResponse.ok) {
          throw new Error('Failed to fetch the name of the admin');
        }
        //We then pass in the active members data

        const adminName = await namesResponse.json();

        setFullName(adminName);

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

  const totalPages = Math.ceil(activeMembers.length / membersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard">
  <Navbar email={email} />

  <div className="dashboard-header">
    <div className="welcome-card">
      <h2>Welcome Back, {userName} 👋</h2>
      <p>This is where you get all the summary</p>
    </div>

    <div
      className="notification-container"
      onClick={() => setShowNotifications(!showNotifications)}
    >
      <Bell size={24} className="notification-bell-icon" />
      {notifications.some((n) => !n.is_read) && (
        <span className="notification-dot" />
      )}
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
                <small>{new Date(notification.created_at).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
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

  <Table
    currentMembers={currentMembers}
    totalPages={totalPages}
    paginate={paginate}
    currentPage={currentPage}
  />
</div>

  );
};

export default Dashboard;
