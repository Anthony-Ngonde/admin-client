import React, { useEffect, useState } from 'react';
import './Members.css';

// Importing the server URL
import { SERVER_URL } from '../../services/api';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Navbar from '../Navbar/Navbar';
import Form from './Form';
import Table from './Table';
import Pagination from './Pagination';

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
        <Form
          onSubmit={onSubmit}
          newMember={newMember}
          errors={errors}
          handleChange={handleChange}
          isSubmitting={isSubmitting}
        />

        <Table
          currentMembers={currentMembers}
          handleDeleteMember={handleDeleteMember}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Members;
