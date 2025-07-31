import React, { useState } from 'react';
import { BACKEND_PATH } from '../configs/routesconfig';
import { useNavigate } from 'react-router';

const Login = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const toggleLoginForm = () => {
    if (props.userType === 'restaurant') {
      navigate('/restaurant/signup');
    }
    if (props.userType === 'volunteer') {
      navigate('/volunteer/signup');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleForgotPassword=()=>{
    navigate("/forgotpassword")
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint =
        props.userType === 'restaurant'
          ? `${BACKEND_PATH}/rescuefood/api/v1/restaurant/signin`
          : `${BACKEND_PATH}/rescuefood/api/v1/volunteer/signin`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('phone', data.phone);
        localStorage.setItem('type', props.userType);
        localStorage.setItem('location',JSON.stringify(data.location))
        // alert('Login successful!');

        if (props.userType === 'restaurant') {
          navigate('/restaurant/dashboard/home');
        } else {
          navigate('/volunteer/dashboard/home');
        }
      } else {
        const errorData = await response.json();
        alert('Login failed. Please check your credentials.');
        setError(errorData?.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ECE852]">
      <div className="w-full max-w-md bg-[#ECE852] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">{props.heading}</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <input
              id="email"
              className="mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              id="password"
              className="mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div className="text-right">
            <p onClick={handleForgotPassword} className="text-sm text-green-500 hover:underline cursor-pointer">
              Forgot Password?
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-400 transition duration-300"
            disabled={false}
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Not a member?{' '}
            <span
              className="text-green-500 font-medium hover:underline cursor-pointer"
              onClick={toggleLoginForm}
            >
              Sign Up Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
