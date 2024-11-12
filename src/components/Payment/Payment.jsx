import React, {useState} from 'react'
import './Payment.css'

const Payment = () => {
  const [formData, setFormData] = useState({
    name: '',
    plan: 'Daily',
    price: '',
    paidDate: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true); // Show success message

    // Clear form after submission
    setFormData({
      name: '',
      plan: 'Daily',
      price: '',
      paidDate: ''
    });

    // Remove success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className='payment'>
      <h1>Payment Page</h1>
      {success && <div className="success-message">✔️ Payment added successfully!</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Plan:
          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            required
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Paid Date:
          <input
            type="date"
            name="paidDate"
            value={formData.paidDate}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default Payment;