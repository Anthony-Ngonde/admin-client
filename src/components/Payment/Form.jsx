//This is the component to hold the form
import './Payment.css';

function Form({ handleFormSubmit, handleInputChange, formData, isSubmitting }) {
  return (
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
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="add-payment-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Payment'}
      </button>
    </form>
  );
}

export default Form;
