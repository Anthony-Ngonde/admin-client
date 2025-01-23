import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import './Auth.css';
import { Link } from 'react-router-dom';

//Importing the server url
import { SERVER_URL } from '../../services/api';
import toast from 'react-hot-toast';

//Zod form validation
const registerSchema = z.object({
  first_name: z.string().min(1, {
    message: 'First name is required',
  }),
  last_name: z.string().min(1, {
    message: 'Last name is required',
  }),
  email: z.string().min(1).email({
    message: 'Invalid email address',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must include at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must include at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must include at least one number' }),
});

function Register() {
  const [formData, setRegisterData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  //State management for handling zode erros
  const [errors, setErrors] = useState({});

  //Handling registration state of the button
  const [isLoading, setIsLoading] = useState(false);

  //Enabling toggling the password visibility
  const [showPassword, setShowPassword] = useState(false);

  //To handling navigating the user after successful server response
  const navigate = useNavigate();

  //Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  //Function to handle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //Function to handle data submittion
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      registerSchema.parse(formData);
      setErrors({});

      const response = await fetch(`${SERVER_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        navigate('/');
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
      setIsLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
            {errors?.first_name && (
              <p className="error-message">{errors.first_name}</p>
            )}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
            {errors?.last_name && (
              <p className="error-message">{errors.last_name}</p>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors?.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors?.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div className="auth-links">
            <span>
              Already have an account?{' '}
              <Link to="/login" className="signup-link">
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
