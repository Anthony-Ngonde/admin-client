import React, { useEffect, useState } from 'react';

import Navbar from '../Navbar/Navbar';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Users, Bell } from 'lucide-react';

// Importing the server URL
import { SERVER_URL } from '../../services/api';
import Table from './Table';

const Dashboard = () => {
  //State to manage opening the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'; // Ensure reset on component unmount
    };
  }, []);
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
    <div className="min-h-screen flex relative bg-gray-100 overflow-hidden"> {/* Prevents page shifting */}
    {/* Navbar */}
    <Navbar email={email} isOpen={isSidebarOpen} onClose={toggleSidebar} />
    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
        onClick={toggleSidebar}
      ></div>
    )}
    {/* Main Content */}
    <main
      className={
        `flex-1 bg-gray-100 p-6 md:p-12 max-w-screen-xl mx-auto transition-all duration-300 ease-in-out overflow-y-auto ` +
        (isSidebarOpen ? 'blur-md opacity-50 md:opacity-100' : 'opacity-100')
      }
    >
      <header className="flex justify-between items-center bg-white py-3 px-6 bg-white/80 backdrop-blur-md rounded-lg shadow-sm mb-6 sticky top-0 z-50"> {/* Increased z-index */}
        <button
          className="md:hidden text-3xl z-50 text-gray-600"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div
          className="relative cursor-pointer mt-4 lg:mt-0"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={32} className="text-gray-600 hover:text-gray-800" />
          {notifications.some((n) => !n.is_read) && (
            <span className="absolute top-0 right-0 bg-red-500 h-5 w-5 rounded-full border-2 border-white"></span>
          )}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 md:w-96 bg-white shadow-lg rounded-lg p-4 z-50 max-h-96 overflow-y-auto">
              {isLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : notifications.length === 0 ? (
                <p className="text-gray-500">No notifications</p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-b last:border-none py-3"
                  >
                    <h4 className="font-medium text-gray-800">
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {notification.message}
                    </p>
                    <small className="text-gray-400 text-xs">
                      {new Date(notification.created_at).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </header>
  
      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome Back, {userName} 👋
          </h2>
          <p className="text-gray-500 text-lg">
            Here's a quick overview of your activities.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-6">
          <div className="bg-blue-100 text-blue-600 p-5 rounded-full">
            <Users size={36} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Total Members
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {totalMembers.length}
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-6">
          <div className="bg-green-100 text-green-600 p-5 rounded-full">
            <Users size={36} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Active Members
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {activeMembers.length}
            </p>
          </div>
        </div>
      </div>
  
      {/* Table Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Members Overview
        </h3>
        <Table
          currentMembers={currentMembers}
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </main>
  </div>
  

  );
};

export default Dashboard;
