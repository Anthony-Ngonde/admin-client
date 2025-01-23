import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import './Auth.css';
import { SERVER_URL } from '../../services/api';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().min(1).email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must include at least one number' }),
});

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      loginSchema.parse(formData);
      setErrors({});
      const response = await fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.access_token);
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
        <h2>Sign In</h2>
        <form onSubmit={onSubmit} className="auth-form">
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
            {errors?.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Sign In'}
          </button>
          <div className="auth-links">
            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
            <span>Don't have an account? <Link to="/register" className="signup-link">Sign Up</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
