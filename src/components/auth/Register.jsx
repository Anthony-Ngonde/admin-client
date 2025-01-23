import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

//Importing the server url
import { SERVER_URL } from '../../services/api';
import toast from 'react-hot-toast';

//Darkmode importation
// import { DarkModeContext } from '../../context/DarkModeContext';

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

  // const { darkMode } = useContext(DarkModeContext);

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
        navigate('/login');
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
    <div
      className={`min-h-screen flex items-center justify-center bg-[#131312] text-white  overflow-hidden`}
    >
      <div className="mx-auto p-4 rounded-lg shadow-lg w-5/6 max-w-sm border border-gray-700">
        <h2 className="text-2xl font-bold mb-1 text-[#019eff] hover:text-[#007bff]">
          Sign Up
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-white font-medium">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full 
                bg-[#131312] text-white 
              } px-4 py-2 border border-gray-600  ${
                errors.first_name ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.first_name ? 'focus:ring-red-500' : 'focus:ring-gray-500'
              }`}
              placeholder="John"
            />
            {errors.first_name && (
              <p id="email_error" className="text-red-500 text-sm mt-1">
                {errors.first_name}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className={`block text-sm font-medium 
                text-white
              }`}
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full  px-4 py-2 border border-gray-600 
                 bg-[#131312] text-white
              } ${
                errors.last_name ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.last_name ? 'focus:ring-red-500' : 'focus:ring-gray-500'
              }`}
              aria-invalid={!!errors.last_name}
              aria-describedby="user_name_error"
              placeholder="Doe"
            />
            {errors.last_name && (
              <p id="user_name_error" className="text-red-500 text-sm mt-1">
                {errors.last_name}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className={`block text-sm font-medium 
                text-white
              }`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full 
               bg-[#131312] text-white'
              } px-4 py-2 border border-gray-600  ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-gray-500'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby="user_name_error"
            />
            {errors.email && (
              <p id="user_name_error" className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className={`block text-sm font-medium 
                text-white
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className={`w-full  px-4 py-2 border border-gray-600
                  bg-[#131312] text-white
                } ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.password ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                }`}
                aria-invalid={!!errors.password}
                aria-describedby="password_error"
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-gray-500  "
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p id="password_error" className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full bg-[#019eff] text-white py-2 rounded-lg flex items-center justify-center hover:bg-[#007bff] focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isLoading && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.419.876 4.623 2.334 6.291l1.666-1.666z"
                />
              </svg>
            ) : (
              'Create an account'
            )}
          </button>
        </form>
        <p className={`text-sm  mt-4 text-white`}>
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-[#007bff] font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
