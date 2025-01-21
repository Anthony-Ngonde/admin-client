import React, { useEffect, useState } from 'react';
import './Members.css';
import { Edit2, Trash2 } from 'lucide-react';

// Importing the server URL
import { SERVER_URL } from '../../services/api';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Navbar from '../Navbar/Navbar';

// Form validation for adding members
const memberSchema = z.object({
  f_name: z.string().min(1, { message: 'First name is required' }),
  l_name: z.string().min(1, { message: 'Last name is required' }),
  phone_number: z.string().min(10, { message: 'Invalid phone number' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

const Members = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [newMember, setNewMember] = useState({
    f_name: '',
    l_name: '',
    phone_number: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      memberSchema.parse(newMember);
      setErrors({});
      const response = await fetch(`${SERVER_URL}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        await fetchMembers();
        setNewMember({ f_name: '', l_name: '', phone_number: '', email: '' });
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/members`);
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      setMembers(data.members || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      const response = await fetch(`${SERVER_URL}/members/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (response.ok) {
        setMembers((prev) => prev.filter((member) => member.id !== id));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(members.length / membersPerPage);

  return (
    <div>
      <Navbar />
      <div className="members-page">
        <form className="registration-form" onSubmit={onSubmit}>
          <div className="form-row">
            <div>
              <input
                type="text"
                name="f_name"
                placeholder="First Name"
                value={newMember.f_name}
                onChange={handleChange}
              />
              {errors?.f_name && <p className="error-message">{errors.f_name}</p>}
            </div>
            <div>
              <input
                type="text"
                name="l_name"
                placeholder="Last Name"
                value={newMember.l_name}
                onChange={handleChange}
              />
              {errors?.l_name && <p className="error-message">{errors.l_name}</p>}
            </div>
          </div>
          <div className="form-row">
            <div>
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={newMember.phone_number}
                onChange={handleChange}
              />
              {errors?.phone_number && (
                <p className="error-message">{errors.phone_number}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newMember.email}
                onChange={handleChange}
              />
              {errors?.email && <p className="error-message">{errors.email}</p>}
            </div>
          </div>
          <button className="register-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register New Member'}
          </button>
        </form>

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
              {currentMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.f_name}</td>
                  <td>{member.l_name}</td>
                  <td>{member.phone_number}</td>
                  <td>{member.email}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => alert(`Edit action for ${member.id}`)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              className={`page-btn ${currentPage === num + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
