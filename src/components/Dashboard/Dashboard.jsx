import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <h2>TeeFlex Admin</h2>
          <p>admin@gmail.com</p>
        </div>
        <nav className="nav">
          <ul>
            <li className="nav-item active">Dashboard</li>
            <li className="nav-item">Members</li>
            <li className="nav-item">Payment</li>
            <li className="nav-item">Logout</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="welcome-header">
          <h1>Welcome Back, TeeFlex Admin 👋</h1>
          <p>This is where you get all the summary</p>
        </header>
        <section className="stats-cards">
          <div className="card total-members">
            <h3>Total Members</h3>
            <p>50</p>
          </div>
          <div className="card active-members">
            <h3>Active Members</h3>
            <p>35</p>
          </div>
        </section>
        <section className="active-members">
          <h2>Active Members</h2>
          <div className="members-table">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <button>Search</button>
              <button className="sort-btn">Sort By</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date Paid</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jane Doe</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>John Doe</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Guido Van</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
