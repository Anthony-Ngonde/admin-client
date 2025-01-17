import React, { useEffect, useState } from "react";
import "./Members.css";
import { Search, Edit2, Trash2 } from "lucide-react";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    f_name: "",
    l_name: "",
    phone_number: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMember, setEditMember] = useState(null); // State to track the member being edited

  // Function to register a new member
  const registerNewMember = async () => {
    if (isSubmitting) return;

    if (
      !newMember.f_name.trim() ||
      !newMember.l_name.trim() ||
      !newMember.phone_number.trim() ||
      !newMember.email.trim()
    ) {
      alert("All fields are required!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) {
        throw new Error("Failed to register new member");
      }

      const data = await response.json();
      if (data.member) {
        setMembers((prevMembers) => [...prevMembers, data.member]); // Add new member optimistically
      }
      setNewMember({ f_name: "", l_name: "", phone_number: "", email: "" });

      fetchMembers();
    } catch (error) {
      console.error("Error registering member:", error);
      alert("Failed to register new member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to fetch all members
  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:5000/members");
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }

      const data = await response.json();
      setMembers(Array.isArray(data.members) ? data.members : []); // Ensure members is an array
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // Function to handle member deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/members/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete member");
      }

      // Remove member from state
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member. Please try again.");
    }
  };

  // Function to handle editing
  const handleEdit = (member) => {
    setEditMember(member); // Set the selected member to edit
  };

  // Function to save the edited member
  const saveEditedMember = async () => {
    if (!editMember.f_name || !editMember.l_name || !editMember.phone_number || !editMember.email) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/members/${editMember.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editMember),
      });

      if (!response.ok) {
        throw new Error("Failed to update member");
      }

      // Update the state with the edited member
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === editMember.id ? { ...editMember } : member
        )
      );

      setEditMember(null); // Clear the edit state
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member. Please try again.");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="members-page">
      {/* Search Bar */}
      <div className="search-bar">
        <Search size={20} />
        <input type="text" placeholder="Type to search" />
      </div>

      {/* Registration Form */}
      <div className="registration-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="First Name"
            value={newMember.f_name}
            onChange={(e) => setNewMember({ ...newMember, f_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newMember.l_name}
            onChange={(e) => setNewMember({ ...newMember, l_name: e.target.value })}
          />
        </div>
        <div className="form-row">
          <input
            type="tel"
            placeholder="Phone Number"
            value={newMember.phone_number}
            onChange={(e) => setNewMember({ ...newMember, phone_number: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          />
        </div>
        <button
          className="register-btn"
          onClick={registerNewMember}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register New Member"}
        </button>
      </div>

      {/* Edit Form */}
      {editMember && (
        <div className="edit-form">
          <h3>Edit Member</h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="First Name"
              value={editMember.f_name}
              onChange={(e) => setEditMember({ ...editMember, f_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editMember.l_name}
              onChange={(e) => setEditMember({ ...editMember, l_name: e.target.value })}
            />
          </div>
          <div className="form-row">
            <input
              type="tel"
              placeholder="Phone Number"
              value={editMember.phone_number}
              onChange={(e) =>
                setEditMember({ ...editMember, phone_number: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email Address"
              value={editMember.email}
              onChange={(e) => setEditMember({ ...editMember, email: e.target.value })}
            />
          </div>
          <button className="save-btn" onClick={saveEditedMember}>
            Save Changes
          </button>
        </div>
      )}

      {/* Members Table */}
      <div className="members-table">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.f_name}</td>
                <td>{member.l_name}</td>
                <td>{member.phone_number}</td>
                <td>{member.email}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(member)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(member.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
