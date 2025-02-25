import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Payment.css';


// Importing the server URL
import { SERVER_URL } from '../../services/api';
import Form from './Form';
import Table from './Table';

const Payment = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    phone_number: '',
    transaction_id: '',
    plan: '',
    amount: '',
    date: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch payment data
  const fetchPaymentData = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/payments`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment data');
      }
      const data = await response.json();
      setPaymentData(data);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, []);

  // Pagination logic
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = paymentData.slice(indexOfFirstPayment, indexOfLastPayment);

  const totalPages = Math.ceil(paymentData.length / paymentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${SERVER_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add payment');
      }

      const newPayment = await response.json();
      setPaymentData((prevPayments) => [...prevPayments, newPayment]);
      setFormData({
        phone_number: '',
        transaction_id: '',
        plan: '',
        amount: '',
        date: '',
      });
      fetchPaymentData();
    } catch (error) {
      console.error('Error adding payment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle payment deletion
  const handleDeletePayment = async (id) => {
    try {
      const response = await fetch(`${SERVER_URL}/payments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete payment');
      }
      fetchPaymentData();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="payment-page">
        {/* Payment Form */}
        {/* <form className="payment-form" onSubmit={handleFormSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="transaction_id"
              placeholder="Transaction ID"
              value={formData.transaction_id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <select
              name="plan"
              value={formData.plan}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Plan
              </option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="add-payment-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Payment'}
          </button>
        </form> */}
<Form handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} formData={formData} isSubmitting={isSubmitting}/>

        {/* Payment Table */}
        
        <div className="payment-table">
          {/* <table>
            <thead>
              <tr>
                <th>Phone Number</th>
                <th>Transaction ID</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Member ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.phone_number}</td>
                  <td>{payment.transaction_id}</td>
                  <td>{payment.plan}</td>
                  <td>{payment.amount}</td>
                  <td>
                    {payment.date
                      ? new Date(payment.date).toLocaleDateString()
                      : 'Invalid Date'}
                  </td>
                  <td>{payment.member_id}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn">
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeletePayment(payment.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <Table currentPayments={currentPayments} handleDeletePayment={handleDeletePayment}/>
          {/* Pagination */}
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
      </div>
    </div>
  );
};

export default Payment;
