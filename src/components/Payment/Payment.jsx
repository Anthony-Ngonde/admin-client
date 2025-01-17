import React, { useEffect, useState } from "react";
import "./Payment.css";
import { Calendar, Edit2, Trash2 } from "lucide-react";

const Payment = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [formData, setFormData] = useState({
    phone_number: "",
    transaction_id: "",
    plan: "",
    amount: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPaymentId, setEditingPaymentId] = useState(null); // Tracks the payment being edited

  // Fetch payment data
  const fetchPaymentData = async () => {
    try {
      const response = await fetch("http://localhost:5000/payments");
      if (!response.ok) {
        throw new Error("Failed to fetch payment data");
      }
      const data = await response.json();
      setPaymentData(data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission (Add or Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const url = editingPaymentId
        ? `http://localhost:5000/payments/${editingPaymentId}`
        : "http://localhost:5000/payments";
      const method = editingPaymentId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingPaymentId ? "edit" : "add"} payment`);
      }

      // If editing, update the payment in the table
      if (editingPaymentId) {
        setPaymentData((prevPayments) =>
          prevPayments.map((payment) =>
            payment.id === editingPaymentId
              ? { ...payment, ...formData }
              : payment
          )
        );
      } else {
        // If adding, fetch the new payment data
        const newPayment = await response.json();
        setPaymentData((prevPayments) => [...prevPayments, newPayment]);
      }

      // Reset the form and editing state
      setFormData({
        phone_number: "",
        transaction_id: "",
        plan: "",
        amount: "",
        date: "",
      });
      setEditingPaymentId(null);
    } catch (error) {
      console.error(`Error ${editingPaymentId ? "editing" : "adding"} payment:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit button click
  const handleEditPayment = (payment) => {
    setEditingPaymentId(payment.id);
    setFormData({
      phone_number: payment.phone_number,
      transaction_id: payment.transaction_id,
      plan: payment.plan,
      amount: payment.amount,
      date: payment.date ? new Date(payment.date).toISOString().split("T")[0] : "",
    });
  };

  // Handle payment deletion
  const handleDeletePayment = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/payments/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete payment");
      }

      // Refetch the updated payment data after deletion
      fetchPaymentData();
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  return (
    <div className="payment-page">
      {/* Payment Form */}
      <form className="payment-form" onSubmit={handleFormSubmit}>
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
          <div className="date-input">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
            <Calendar size={20} />
          </div>
        </div>
        <button type="submit" className="add-payment-btn" disabled={isSubmitting}>
          {isSubmitting
            ? editingPaymentId
              ? "Saving..."
              : "Adding..."
            : editingPaymentId
            ? "Save Changes"
            : "Add Payment"}
        </button>
      </form>

      {/* Payment Table */}
      <div className="payment-table">
        <table>
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
            {paymentData.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.phone_number}</td>
                <td>{payment.transaction_id}</td>
                <td>{payment.plan}</td>
                <td>{payment.amount}</td>
                <td>
                  {payment.date
                    ? new Date(payment.date).toLocaleDateString()
                    : "Invalid Date"}
                </td>
                <td>{payment.member_id}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditPayment(payment)}
                    >
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
        </table>
      </div>
    </div>
  );
};

export default Payment;
