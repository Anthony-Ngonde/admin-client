//Form component

function Form({ onSubmit, newMember, errors, handleChange, isSubmitting }) {
  return (
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
  );
}

export default Form;
