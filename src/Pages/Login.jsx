import React, { useState } from 'react';
import { useLogin } from '../Hooks/useLogin';

const Login = () => {
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
        <h3>Login</h3>

        {/* Email */}
        <label>Email Adress:</label>
        <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
        />

        {/* Password */}
        <label>Password:</label>
        <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
        />

        <button disabled={isLoading}>Login</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login;