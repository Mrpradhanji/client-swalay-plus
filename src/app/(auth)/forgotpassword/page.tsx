"use client"
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { apiPost } from '@/helpers/axiosRequest'; // Assuming this is your custom axios request function

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      const response = await apiPost('/api/user/forgot-password', { email });
      if (response.success) {
        toast.success('Check your email for the reset link');
        setEmail('');
      } else {
        toast.error(response.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
      toast.error('Failed to send reset email');
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <p>Please enter your email to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
