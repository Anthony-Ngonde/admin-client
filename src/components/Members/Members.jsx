import React, { useEffect, useState } from 'react';
import './Members.css';
import { Search, Edit2, Trash2 } from 'lucide-react';

//Importing the server url
import { SERVER_URL } from '../../services/api';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Navbar from '../Navbar/Navbar';

/**
 * TODO
 * Have a loader while data is fetching
 *
 *TODO
 *Add an svg for no data found

 *TODO
 *Add pagination

*TODO
*Add a confirm delete modal
 */

//Handling passing in correct mobile numbers
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

//Form validation for adding members
const memberSchema = z.object({
  f_name: z.string().min(1, {
    message: 'First name is required',
  }),
  l_name: z.string().min(1, {
    message: 'Last name is required',
  }),
  phone_number: z.string().regex(phoneRegex, {
    message: 'Invalid phone number',
  }),
  email: z.string().min(1).email({
    message: 'Invalid email address',
  }),
});

const Members = () => {
  //Responsible for fetching new members
  const [members, setMembers] = useState([]);

  //Checking on the submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Updating errors encountered when adding new members
  const [errors, setErrors] = useState({});

  //Adding new members details
  const [newMember, setNewMember] = useState({
    f_name: '',
    l_name: '',
    phone_number: '',
    email: '',
  });

  //Handling the user input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  //Handling the form submittion/adding new member
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      //Parsing in the data through zod form handler
      memberSchema.parse(newMember);
      //Catching any errors
      setErrors({});

      const response = await fetch(`${SERVER_URL}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          f_name: newMember.f_name,
          l_name: newMember.l_name,
          phone_number: newMember.phone_number,
          email: newMember.email,
        }),
      });

      const result = await response.json();

      //Checking if the response is ok
      if (response.ok) {
        //Adding a promise for fetching data
        await fetchMembers();
        //Message from the backend
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      //Handling zod errors
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

  // Function to fetch all members
  const fetchMembers = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/members`);
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }

      const data = await response.json();
      setMembers(Array.isArray(data.members) ? data.members : []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  // Function to handle member deletion
  const handleDeleteMember = async (id) => {
    try {
      const response = await fetch(`${SERVER_URL}/members/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application.json',
        },
      });
      const result = await response.json();

      if (response.ok) {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== id)
        );
        toast.success(result.message);
      } else {
        const errorMessage = await response.text();
        toast.error(`Failed to delete employee: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error deleting employee:', err);
      toast.error('An error occurred while deleting the employee.');
    }
  };

  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm(
  //     'Are you sure you want to delete this member?'
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     const response = await fetch(`${SERVER_URL}/members/${id}`, {
  //       method: 'DELETE',
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to delete member');
  //     }

  //     // Remove member from state
  //     setMembers((prevMembers) =>
  //       prevMembers.filter((member) => member.id !== id)
  //     );
  //   } catch (error) {
  //     console.error('Error deleting member:', error);
  //     alert('Failed to delete member. Please try again.');
  //   }
  // };

  // Function to handle editing (to be implemented)
  const handleEdit = (id) => {
    alert(`Edit action for member with ID: ${id}`);
    // Implement the edit logic here
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
    <Navbar/>
    <div className="members-page">
      {/* Search Bar
      <div className="search-bar">
        <Search size={20} />
        <input type="text" placeholder="Type to search" />
      </div> */}

      {/* Registration Form */}
      <form className="registration-form" onSubmit={onSubmit}>
        <div className="form-row">
          <div>
            <input
              type="text"
              name="f_name"
              placeholder="John"
              value={newMember.f_name}
              onChange={handleChange}
            />
            {errors?.f_name && <p className="error-message">{errors.f_name}</p>}
          </div>

          <div>
            <input
              type="text"
              name="l_name"
              placeholder="Doe"
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
              placeholder="0712345678"
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
              placeholder="member@gmail.com"
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
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(member.id)}
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
    </div>
    </div>
  );
};

export default Members;
