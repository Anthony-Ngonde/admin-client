import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Navbar from '../Navbar/Navbar'
import { Users,Bell } from "lucide-react";

//Importing the server url
import { SERVER_URL } from "../../services/api";

const Dashboard = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [activeMembers, setActiveMembers] = useState(0);
  const [activeData, setActiveData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total members
        const membersResponse = await fetch(`${SERVER_URL}/members`);
        if (!membersResponse.ok) {
          throw new Error("Failed to fetch total members");
        }
        const membersData = await membersResponse.json();
        setTotalMembers(membersData.members.length);

        // Fetch active members
        const paymentsResponse = await fetch(`${SERVER_URL}/payments`);
        if (!paymentsResponse.ok) {
          throw new Error("Failed to fetch active members");
        }
        const paymentsData = await paymentsResponse.json();
        const uniqueActiveMembers = new Set(paymentsData.map((payment) => payment.member_id));
        setActiveMembers(uniqueActiveMembers.size);

        // Fetch actives data
        const activesResponse = await fetch(`${SERVER_URL}/actives`);
        if (!activesResponse.ok) {
          throw new Error("Failed to fetch actives data");
        }
        const activesData = await activesResponse.json();
        setActiveData(activesData);

        await fetchNotifications(); // Fetch notifications initially
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
    const intervalId = setInterval(fetchNotifications, 10000); // Poll notifications every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5000/notifications");
      if (!response.ok) throw new Error("Failed to fetch notifications");
      const notificationsData = await response.json();
      setNotifications(notificationsData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/notification/${id}`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Failed to mark notification as read");
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/notification/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete notification");
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
    <Navbar/>
      <div className="welcome-card">
        <h2>Welcome Back, TeeFlex Admin 👋</h2>
        <p>This is where you get all the summary</p>
        <div
          className="notification-bell"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={24} />
          {notifications.some((n) => !n.is_read) && <span className="notification-dot" />}
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
                  <small>{new Date(notification.created_at).toLocaleString()}</small>
                  <div className="notification-actions">
                    {!notification.is_read && (
                      <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
                    )}
                    <button onClick={() => deleteNotification(notification.id)}>Delete</button>
                  </div>
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
            <p>{totalMembers}</p>
          </div>
        </div>

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
































